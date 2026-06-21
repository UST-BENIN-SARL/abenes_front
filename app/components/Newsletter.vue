<template>
  <div class="rounded-md bg-white px-7 py-6  text-(--text-dark)">
    <h3 class="text-base font-bold text-(--primary-darkest)">Newsletter</h3>
    <form
      class="mt-3 flex items-center overflow-hidden rounded-full border border-(--border) focus-within:ring-2 focus-within:ring-(--primary)/30"
      @submit.prevent="subscribe"
    >
      <input
        v-model="email"
        type="email"
        required
        placeholder="Email"
        class="w-full px-5 py-2 text-sm text-(--text-dark) placeholder:text-(--text-secondary) focus:outline-none"
      >
      <UiButton type="submit" size="icon" aria-label="S'abonner" class="shrink-0 rounded-full mr-0.5">
        <ArrowRight class="size-4" />
      </UiButton>
    </form>
    <p class="mt-3 text-xs text-(--text-secondary)">
      Veuillez vous inscrire à notre newsletter afin de recevoir régulièrement nos actualités, informations et mises à jour.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'

const email = ref('')

const subscribe = () => {
  useCustomToast('Merci de votre inscription à la newsletter !', 'success').temporary()
  email.value = ''
}
</script>
