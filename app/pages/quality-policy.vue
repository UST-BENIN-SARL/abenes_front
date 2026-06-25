<template>
  <div>
    <SeoManager :title="$t('pages.quality_policy.seo_title')" />

    <section class="container mx-auto px-4 py-10 sm:py-14">
      <div class="mx-auto max-w-2xl text-center">
        <p class="mt-3 text-sm text-(--text-secondary)">{{ $t('pages.quality_policy.subtitle') }}</p>
      </div>

      <div class="mx-auto mt-10 max-w-xl overflow-hidden rounded-xl border border-(--border) bg-white p-4 shadow-sm">
        <NuxtImg
          src="/images/about/quality-policy.webp"
          :alt="$t('pages.quality_policy.title')"
          width="827"
          class="w-full rounded-lg"
        />
      </div>

      <div class="mt-8 flex justify-center">
        <UiButton as-child size="lg">
          <a href="/images/about/quality-policy.webp" download class="font-semibold">
            {{ $t('pages.quality_policy.download_cta') }}
          </a>
        </UiButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  pageBanner: {
    titleKey: 'pages.quality_policy.title',
    breadcrumbKey: 'pages.quality_policy.seo_title'
  }
})
</script>
