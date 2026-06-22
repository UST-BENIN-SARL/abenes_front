<template>
  <div class="p-6">
    <SeoManager :title="$t('pages.news.seo_title')" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageBanner: {
    titleKey: 'pages.news.title',
    subtitleKey: 'pages.news.subtitle',
    breadcrumbKey: 'pages.news.seo_title'
  }
})
</script>
