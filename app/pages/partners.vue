<template>
  <div class="container mx-auto px-4 py-12">
    <SeoManager :title="$t('pages.partners.seo_title')" />

    <div class="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
      <div
        v-for="partner in partners"
        :key="partner.name"
        class="flex h-24 items-center justify-center rounded-lg border border-(--border) bg-white px-4 text-center font-bold text-(--primary-dark)"
      >
        {{ partner.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageBanner: {
    titleKey: 'pages.partners.title',
    subtitleKey: 'pages.partners.subtitle',
    breadcrumbKey: 'pages.partners.seo_title'
  }
})

const partners = [
  { name: 'Human' },
  { name: 'HumaSens2.0' },
  { name: 'Finecare' }
]
</script>
