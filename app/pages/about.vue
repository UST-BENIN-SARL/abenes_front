<template>
  <div class="p-6">
    <SeoManager :title="$t('pages.about.seo_title')" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageBanner: {
    titleKey: 'pages.about.title',
    subtitleKey: 'pages.about.subtitle',
    breadcrumbKey: 'pages.about.seo_title'
  }
})
</script>
