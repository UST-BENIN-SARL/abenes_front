<template>
  <div class="p-6">
    <SeoManager :title="$t('pages.jobs.seo_title')" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageBanner: {
    titleKey: 'pages.jobs.title',
    subtitleKey: 'pages.jobs.subtitle',
    breadcrumbKey: 'pages.jobs.seo_title'
  }
})
</script>
