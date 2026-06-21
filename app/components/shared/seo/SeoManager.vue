<template>
  <div></div>
</template>

<script setup lang="ts">
const route = useRoute()
const { currentLocale } = useI18nLocale()
const { t } = useI18n()

const props = defineProps({
  title: { type: String, default: 'ABENES SARL' },
  description: { type: String, default: '' },
  image: { type: String, default: '/images/logo.png' },
  url: { type: String, default: '' }
})

const description = computed(() => props.description || t('common.seo.default_description'))
const computedUrl = computed(() => props.url || useSiteUrl() + `${route.path}`)

useSeoMeta({
  title: props.title,
  description: description.value,
  ogTitle: props.title,
  ogDescription: description.value,
  ogImage: props.image,
  ogUrl: computedUrl.value,
  ogType: 'website',
  ogSiteName: 'ABENES SARL',
  ogLocale: currentLocale.value.replace('-', '_'),
  twitterCard: 'summary_large_image',
  twitterTitle: props.title,
  twitterDescription: description.value,
  twitterImage: props.image,
  author: 'ABENES SARL',
  robots: 'index, follow'
})

useHead({
  title: `${props.title} - ABENES SARL`,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'theme-color', content: '#042c53' },
    { name: 'application-name', content: 'ABENES SARL' },
    { name: 'generator', content: 'Nuxt 3' },
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },
    { name: 'color-scheme', content: 'light dark' },
    { name: 'geo.region', content: 'FR' },
    { name: 'geo.country', content: 'France' }
  ],
  link: [
    { rel: 'canonical', href: computedUrl.value },
    { rel: 'icon', type: 'image/x-icon', href: props.image },
    { rel: 'apple-touch-icon', sizes: '180x180', href: props.image },
    { rel: 'manifest', href: '/manifest.json' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
  ]
})
</script>
