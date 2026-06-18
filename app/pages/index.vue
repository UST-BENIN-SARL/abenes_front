<template>
  <div class="p-6">
    <SeoManager :title="$t('pages.home.seo_title')" />

    <h1 class="text-2xl font-bold text-(--text-title)">{{ $t('pages.home.title') }}</h1>
    <p class="mt-1 text-sm text-(--text-secondary)">{{ $t('pages.home.subtitle') }}</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
</script>
