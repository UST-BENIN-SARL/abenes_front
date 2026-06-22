<template>
  <div class="p-6">
    <SeoManager :title="slug" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageBanner: {
    parentKey: 'pages.news.seo_title',
    parentTo: '/news',
    titleParam: 'slug'
  }
})

const route = useRoute()
const slug = String(route.params.slug ?? '')
</script>
