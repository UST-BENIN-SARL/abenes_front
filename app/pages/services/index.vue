<template>
  <div class="container mx-auto px-4 py-10 sm:py-14">
    <SeoManager :title="$t('pages.services.seo_title')" />

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="step in steps"
        :key="step.key"
        class="flex flex-col gap-3 rounded-xl border border-(--border) bg-white p-6"
      >
        <div class="flex size-12 items-center justify-center rounded-full bg-(--accent-gray-light) text-(--primary)">
          <component :is="step.icon" class="size-6" />
        </div>
        <p class="font-bold text-(--primary-dark)">{{ $t(`pages.services.journey.steps.${step.key}.title`) }}</p>
        <p class="text-sm text-(--text-secondary)">{{ $t(`pages.services.journey.steps.${step.key}.description`) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GraduationCap, MessageCircleQuestion, PackageSearch, Settings2, Truck, Wrench } from '@lucide/vue'

definePageMeta({
  pageBanner: {
    titleKey: 'pages.services.title',
    subtitleKey: 'pages.services.subtitle',
    breadcrumbKey: 'pages.services.seo_title'
  }
})

const steps = [
  { key: 'consulting', icon: MessageCircleQuestion },
  { key: 'supply', icon: Truck },
  { key: 'installation', icon: Settings2 },
  { key: 'training', icon: GraduationCap },
  { key: 'maintenance', icon: Wrench },
  { key: 'parts', icon: PackageSearch }
]
</script>
