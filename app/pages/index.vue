<template>
  <div>
    <SeoManager :title="$t('pages.home.seo_title')" />

    <HeroBanner />

    <div class="p-6">
      <h1 class="text-2xl font-bold text-(--text-title)">{{ $t('pages.home.title') }}</h1>
      <p class="mt-1 text-sm text-(--text-secondary)">{{ $t('pages.home.subtitle') }}</p>
    </div>
  </div>
</template>
