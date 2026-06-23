// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  srcDir: 'app/',
  app: {
    head: {
      meta: [
        { name: 'description', content: 'ABENES SARL' },
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
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    '@nuxt/fonts',
    'nuxt-swiper',
    '@nuxtjs/leaflet',
    'shadcn-nuxt',
    '@dargmuesli/nuxt-cookie-control'
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: '@/components/ui'
  },
  cookieControl: {
    barPosition: 'bottom-full',
    closeModalOnClickOutside: true,
    isModalForced: false,
    isAcceptNecessaryButtonEnabled: true,
    isControlButtonEnabled: false,
    declineAllAcceptsNecessary: true,
    locales: ['fr', 'en'],
    isCssEnabled: false,
    localeTexts: {
      fr: {
        decline: 'Refuser',
        save: 'Sauvegarder',
        manageCookies: 'Paramétrer les cookies'
      },
      en: {
        decline: 'Decline',
        save: 'Save',
        manageCookies: 'Manage cookie settings'
      }
    },
    cookies: {
      necessary: [
        {
          id: 'necessary',
          name: { fr: 'Cookies nécessaires', en: 'Necessary cookies' },
          description: {
            fr: 'Indispensables au fonctionnement du site (langue, sécurité).',
            en: 'Required for the site to function (language, security).'
          }
        }
      ],
      optional: [
        {
          id: 'recaptcha',
          name: { fr: 'reCAPTCHA', en: 'reCAPTCHA' },
          description: {
            fr: 'Protège les formulaires contre les robots (Google).',
            en: 'Protects forms against bots (Google).'
          },
          isPreselected: false,
          links: { 'https://policies.google.com/privacy': 'Google Privacy Policy' },
          targetCookieIds: ['_GRECAPTCHA']
        }
      ]
    }
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL
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
      include: ['vue3-recaptcha-v2', 'vue3-toastify', 'vue-tel-input', 'zod', 'leaflet']
    }
  }
})