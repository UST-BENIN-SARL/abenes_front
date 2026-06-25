<template>
  <div>
    <SeoManager :title="$t('pages.home.seo_title')" />

    <HeroBanner />

    <Partners />

    <section class="bg-(--background-gray) py-14 sm:py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-center text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">
          {{ $t('pages.home.why_us.title') }}
        </h2>
        <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="item in whyUsItems" :key="item.key" class="flex flex-col items-center gap-3 rounded-xl bg-white p-6 text-center shadow-sm">
            <div class="flex size-12 items-center justify-center rounded-full bg-(--accent-gray-light) text-(--primary)">
              <component :is="item.icon" class="size-6" />
            </div>
            <p class="font-bold text-(--primary-dark)">{{ $t(`pages.home.why_us.items.${item.key}.title`) }}</p>
            <p class="text-sm text-(--text-secondary)">{{ $t(`pages.home.why_us.items.${item.key}.description`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="grid gap-6 rounded-xl bg-(--background-gray) p-8 sm:grid-cols-2 sm:items-center sm:gap-10">
          <div>
            <p class="text-lg font-bold text-(--primary-dark)">{{ $t('pages.home.newsletter_cta.title') }}</p>
            <p class="mt-1 text-sm text-(--text-secondary)">{{ $t('pages.home.newsletter_cta.description') }}</p>
          </div>
          <Newsletter />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { MessageCircleQuestion, ShieldCheck, Tag, Truck } from '@lucide/vue'

const whyUsItems = [
  { key: 'delivery', icon: Truck },
  { key: 'warranty', icon: ShieldCheck },
  { key: 'consulting', icon: MessageCircleQuestion },
  { key: 'pricing', icon: Tag }
]
</script>
