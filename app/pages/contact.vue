<template>
  <div class="p-6">
    <SeoManager :title="$t('pages.contact.seo_title')" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageBanner: {
    titleKey: 'pages.contact.title',
    subtitleKey: 'pages.contact.subtitle',
    breadcrumbKey: 'pages.contact.seo_title'
  }
})
</script>
