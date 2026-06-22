<template>
  <div class="p-6">
    <SeoManager :title="$t('pages.services.seo_title')" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageBanner: {
    titleKey: 'pages.services.title',
    subtitleKey: 'pages.services.subtitle',
    breadcrumbKey: 'pages.services.seo_title'
  }
})
</script>
