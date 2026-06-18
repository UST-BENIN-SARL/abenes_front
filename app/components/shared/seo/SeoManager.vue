<template>
  <div></div>
</template>

<script setup lang="ts">
const route = useRoute()
const { currentLocale } = useI18nLocale()

const props = defineProps({
  title: { type: String, default: 'SoLE SA' },
  description: {
    type: String,
    default: 'Réserver facilement vos espaces pour tous vos évènements.'
  },
  image: { type: String, default: '/images/logos/favicon.svg' },
  url: { type: String, default: '' }
})

const computedUrl = computed(() => props.url || useSiteUrl() + `${route.path}`)

useSeoMeta({
  title: props.title,
  description: props.description,
  ogTitle: props.title,
  ogDescription: props.description,
  ogImage: props.image,
  ogUrl: computedUrl.value,
  ogType: 'website',
  ogSiteName: 'SoLE SA',
  ogLocale: currentLocale.value.replace('-', '_'),
  twitterCard: 'summary_large_image',
  twitterTitle: props.title,
  twitterDescription: props.description,
  twitterImage: props.image,
  author: 'SoLE SA',
  robots: 'index, follow'
})

useHead({
  title: `${props.title} - SoLE`,
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'theme-color', content: '#10354C' },
    { name: 'application-name', content: 'SoLE SA' },
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
