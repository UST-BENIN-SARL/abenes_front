<template>
  <footer class="bg-(--primary-darkest) text-white">
    <div class="container mx-auto px-4 py-12">
      <div class="grid gap-10 lg:grid-cols-4 lg:gap-16">
        <!-- Logo + description + newsletter -->
        <div class="lg:col-span-1">
          <NuxtLink to="/" class="inline-block rounded-lg bg-white p-2">
            <NuxtImg src="/images/logo.png" alt="ABENES SARL" class="h-14 w-auto" />
          </NuxtLink>
          <p class="mt-3 text-sm text-white/70">
            {{ $t('common.seo.default_description') }}
          </p>
          <Newsletter class="mt-5" />
        </div>

        <!-- Navigation + Informations + Contact -->
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
          <div>
            <h3 class="text-xs font-semibold tracking-widest text-(--blue-200) uppercase">
              {{ $t('common.footer.nav_heading') }}
            </h3>
            <ul class="mt-4 space-y-3 text-sm">
              <li v-for="item in navItems" :key="item.to">
                <NuxtLink :to="item.to" class="text-white/75 transition-colors hover:text-white">
                  {{ $t(item.labelKey) }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-xs font-semibold tracking-widest text-(--blue-200) uppercase">
              {{ $t('common.footer.info_heading') }}
            </h3>
            <ul class="mt-4 space-y-3 text-sm">
              <li v-for="item in infoItems" :key="item.to">
                <NuxtLink :to="item.to" class="text-white/75 transition-colors hover:text-white">
                  {{ $t(item.labelKey) }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="col-span-2 sm:col-span-1">
            <h3 class="text-xs font-semibold tracking-widest text-(--blue-200) uppercase">
              {{ $t('common.footer.contact_heading') }}
            </h3>
            <ul class="mt-4 space-y-3 text-sm text-white/75">
              <li class="flex items-start gap-2">
                <MapPin class="mt-0.5 size-4 shrink-0" />
                <span>{{ $t('common.footer.address') }}</span>
              </li>
              <li class="flex items-center gap-2">
                <Phone class="size-4 shrink-0" />
                <a href="tel:+22920212574" class="transition-colors hover:text-white">+229 20 21 25 74</a>
              </li>
            </ul>
            <div class="mt-5 flex gap-3">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.href"
                :aria-label="social.name"
                target="_blank"
                rel="noopener noreferrer"
                class="flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-(--blue-200) hover:text-(--primary-darkest)"
                v-html="social.icon"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 border-t border-white/10 pt-6">
        <p class="text-center text-sm text-white/50">
          © {{ year }} ABENES SARL. {{ $t('common.footer.rights') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { MapPin, Phone } from '@lucide/vue'

const year = new Date().getFullYear()

const navItems = [
  { to: '/about', labelKey: 'common.nav.about' },
  { to: '/services', labelKey: 'common.nav.services' },
  { to: '/products', labelKey: 'common.nav.products' },
  { to: '/partners', labelKey: 'common.nav.partners' },
  { to: '/contact', labelKey: 'common.nav.contact' }
]

const infoItems = [
  { to: '/news', labelKey: 'common.nav.news' },
  { to: '/jobs', labelKey: 'common.nav.jobs' },
  { to: '/quality-policy', labelKey: 'pages.quality_policy.seo_title' },
  { to: '/privacy-policy', labelKey: 'pages.privacy_policy.seo_title' },
  { to: '/legal-notice', labelKey: 'pages.legal_notice.seo_title' }
]

const socials = SOCIAL_LINKS
</script>
