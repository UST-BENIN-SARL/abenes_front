<template>
  <section class="relative overflow-hidden bg-gradient-to-r from-(--primary-dark) to-(--primary) py-10 sm:py-14">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />

    <div class="container relative z-10 mx-auto px-4">
      <UiBreadcrumb v-if="breadcrumbs?.length">
        <UiBreadcrumbList>
          <UiBreadcrumbItem>
            <UiBreadcrumbLink as-child class="text-white/70 hover:text-white">
              <NuxtLink to="/">{{ $t('common.breadcrumb.home') }}</NuxtLink>
            </UiBreadcrumbLink>
          </UiBreadcrumbItem>

          

          <template v-for="(crumb, index) in breadcrumbs" :key="crumb.label">
            <UiBreadcrumbSeparator class="text-white/60" />
            <UiBreadcrumbItem>
              <UiBreadcrumbPage v-if="index === breadcrumbs.length - 1" class="font-semibold text-white">
                {{ crumb.label }}
              </UiBreadcrumbPage>
              <UiBreadcrumbLink v-else as-child class="text-white/70 hover:text-white">
                <NuxtLink :to="crumb.to ?? '/'">{{ crumb.label }}</NuxtLink>
              </UiBreadcrumbLink>
            </UiBreadcrumbItem>
          </template>
        </UiBreadcrumbList>
      </UiBreadcrumb>

      <h1 class="mt-3 text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">{{ title }}</h1>
      <p v-if="subtitle" class="mt-2 max-w-2xl text-sm text-white/85 sm:text-base">{{ subtitle }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PageBannerCrumb } from '~/types/page-banner'

defineProps<{
  title: string
  subtitle?: string
  breadcrumbs?: PageBannerCrumb[]
}>()
</script>
