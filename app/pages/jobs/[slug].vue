<template>
  <div class="p-6">
    <SeoManager :title="slug" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageBanner: {
    parentKey: 'pages.jobs.seo_title',
    parentTo: '/jobs',
    titleParam: 'slug'
  }
})

const route = useRoute()
const slug = String(route.params.slug ?? '')
</script>
