<template>
  <div class="flex min-h-screen flex-col">
    <div ref="fixedHeaderRef" class="fixed inset-x-0 top-0 z-50">
      <AppAlert />
      <AppHeader />
    </div>

    <main class="flex-1" :style="{ paddingTop: `${height}px`, '--fixed-header-height': `${height}px` }">
      <PageBanner
        v-if="showPageBanner"
        :title="pageBannerTitle"
        :subtitle="pageBannerSubtitle"
        :breadcrumbs="pageBannerBreadcrumbs"
      />

      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
const fixedHeaderRef = ref<HTMLElement | null>(null)
const { height } = useElementSize(fixedHeaderRef)

const {
  show: showPageBanner,
  title: pageBannerTitle,
  subtitle: pageBannerSubtitle,
  breadcrumbs: pageBannerBreadcrumbs
} = usePageBanner()
</script>
