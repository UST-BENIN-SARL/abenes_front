<template>
  <div class="p-6">
    <SeoManager :title="$t('pages.legal_notice.seo_title')" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageBanner: {
    titleKey: 'pages.legal_notice.title',
    breadcrumbKey: 'pages.legal_notice.seo_title'
  }
})
</script>
