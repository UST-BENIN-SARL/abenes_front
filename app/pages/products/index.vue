<template>
  <div class="p-6">
    <SeoManager :title="$t('pages.products.seo_title')" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageBanner: {
    titleKey: 'pages.products.title',
    subtitleKey: 'pages.products.subtitle',
    breadcrumbKey: 'pages.products.seo_title'
  }
})
</script>
