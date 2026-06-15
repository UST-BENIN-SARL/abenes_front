// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  srcDir: 'app/',
  app: {
    head: {
      meta: [
        { name: 'description', content: 'SoLE SA' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  imports: {
    dirs: ['~/composables', '~/composables/*/index.{ts,js,mjs,mts}', '~/composables/**']
  },
  compatibilityDate: '2025-07-15',
  ssr: true,
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  plugins: [{ src: '~/plugins/vue3-recaptcha-v2.client.ts', mode: 'client' }],
  modules: [
    '@primevue/nuxt-module',
    '@nuxt/content',
    '@nuxt/test-utils',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    'nuxt-zod-i18n',
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxt/fonts',
    'nuxt-swiper',
    '@nuxtjs/leaflet'
  ],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL
    }
  },
  zodI18n: {
    localeCodesMapping: {
      fr: 'fr-FR',
      en: 'en-US',
      'en-US': 'en-US',
      'fr-FR': 'fr-FR'
    }
  },
  i18n: {
    defaultLocale: 'fr-FR',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'fr-FR',
        language: 'fr-FR',
        name: 'Français',
        file: 'fr-FR.json'
      },
      {
        code: 'en-US',
        language: 'en-US',
        name: 'English',
        file: 'en-US.json'
      }
    ],
    langDir: '../i18n/locales',
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['vue3-recaptcha-v2', 'vue3-toastify', 'vue-tel-input']
    }
  }
})
