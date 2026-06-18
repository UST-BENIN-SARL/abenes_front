<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-(--background) px-4">
    <SeoManager :title="$t('pages.login.seo_title')" />

    <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <div class="mb-6 text-center">
        <NuxtLink to="/" class="text-2xl font-extrabold text-(--primary-darkest)">SoLE SA</NuxtLink>
        <h1 class="mt-2 text-xl font-bold text-(--text-title)">{{ $t('pages.login.title') }}</h1>
        <p class="mt-1 text-sm text-(--text-secondary)">{{ $t('pages.login.subtitle') }}</p>
      </div>

      <form class="flex flex-col gap-4" novalidate @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-1">
          <label class="text-sm font-medium text-(--text-label)" for="email">
            {{ $t('pages.login.email') }}
          </label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            class="rounded-lg border border-(--border) px-3 py-2 text-sm outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
            :class="{ 'border-(--danger)': errors.email }"
            @blur="validateField('email', form.email)"
          />
          <p v-if="errors.email" class="text-xs text-(--danger)">{{ errors.email }}</p>
        </div>

        <div class="flex flex-col gap-1">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-(--text-label)" for="password">
              {{ $t('pages.login.password') }}
            </label>
            <NuxtLink
              to="/forgot-password"
              class="text-xs text-(--primary) hover:underline"
            >
              {{ $t('pages.login.forgot_password') }}
            </NuxtLink>
          </div>
          <input
            id="password"
            v-model="form.password"
            type="password"
            autocomplete="current-password"
            class="rounded-lg border border-(--border) px-3 py-2 text-sm outline-none transition focus:border-(--primary) focus:ring-2 focus:ring-(--primary)/20"
            :class="{ 'border-(--danger)': errors.password }"
            @blur="validateField('password', form.password)"
          />
          <p v-if="errors.password" class="text-xs text-(--danger)">{{ errors.password }}</p>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="mt-2 rounded-lg bg-(--primary) px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-(--primary-light-hover) disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ isLoading ? $t('pages.login.loading') : $t('pages.login.submit') }}
        </button>
      </form>
    </div>

    <LanguageSwitcher class="mt-6" />
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod'

definePageMeta({ middleware: 'guest', layout: false })

const { t } = useI18n()
const { login, isLoading } = useUser()

const loginSchema = z.object({
  email: z.string().min(1, t('validation.required')).email(t('validation.email')),
  password: z.string().min(8, t('validation.password_min'))
})

const form = reactive({ email: '', password: '' })
const { errors, validateField, validateForm } = useFormValidation(loginSchema)

const handleSubmit = async () => {
  if (!validateForm(form)) return

  const { success } = await login(form.email, form.password)
  if (success) await navigateTo('/')
}
</script>
