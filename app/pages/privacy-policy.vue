<template>
  <div class="p-6">
    <SeoManager :title="$t('pages.privacy_policy.seo_title')" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageBanner: {
    titleKey: 'pages.privacy_policy.title',
    breadcrumbKey: 'pages.privacy_policy.seo_title'
  }
})
</script>
