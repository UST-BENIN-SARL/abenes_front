<template>
  <footer class="bg-(--primary-darkest) text-white">
    <div class="container mx-auto flex flex-col items-center gap-10 px-4 py-12 lg:flex-row lg:gap-24">
      <div class="max-w-sm">
        <NuxtLink to="/" class="inline-block rounded-lg bg-white p-2">
          <NuxtImg src="/images/logo.png" alt="ABENES SARL" class="h-14 w-auto" />
        </NuxtLink>
        <p class="mt-2 text-sm text-white/70">
          {{ $t("common.seo.default_description") }}
        </p>
        <Newsletter class="mt-5" />
      </div>

      <div class="w-full flex flex-col gap-10">
        <div class="flex w-full flex-col gap-10 sm:flex-row sm:gap-16">
          <div class="flex-1">
            <h3 class="text-sm font-semibold mb-6 tracking-wide text-(--blue-200) uppercase">
              {{ $t("common.footer.nav_heading") }}
            </h3>
            <ul class="mt-4 space-y-3 text-sm">
              <li v-for="item in navItems" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="text-white/80 transition-colors hover:text-white"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="flex-1">
            <h3 class="text-sm font-semibold mb-6 tracking-wide text-(--blue-200) uppercase">
              {{ $t("common.footer.info_heading") }}
            </h3>
            <ul class="mt-4 space-y-3 text-sm">
              <li v-for="item in legalItems" :key="item.to">
                <NuxtLink
                  :to="item.to"
                  class="text-white/80 transition-colors hover:text-white"
                >
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="flex-1">
            <h3 class="text-sm font-semibold mb-6 tracking-wide text-(--blue-200) uppercase">
              {{ $t("common.footer.contact_heading") }}
            </h3>
            <ul class="mt-4 space-y-3 text-sm text-white/80">
              <li class="flex items-center gap-2">
                <MapPin class="size-4 shrink-0" />
                <span>{{ $t("common.footer.address") }}</span>
              </li>
              <li class="flex items-center gap-2">
                <Phone class="size-4 shrink-0" />
                <a href="tel:+22920212574" class="transition-colors hover:text-white"
                  >+229 20 21 25 74</a
                >
              </li>
            </ul>
            <div class="mt-4 flex gap-3">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.href"
                :aria-label="social.name"
                target="_blank"
                rel="noopener noreferrer"
                class="flex size-9 items-center justify-center rounded-full bg-white text-(--primary-darkest) transition-colors hover:bg-(--blue-200)"
                v-html="social.icon"
              />
            </div>
          </div>
        </div>
        <div class="border-t border-white/10 py-5">
          <p class="text-center text-sm text-white/60">
            © {{ year }} ABENES SARL. {{ $t("common.footer.rights") }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { MapPin, Phone } from "@lucide/vue";

const { t } = useI18n();
const year = new Date().getFullYear();

const navItems = computed(() => [
  { to: "/about", label: t("common.nav.about") },
  { to: "/services", label: t("common.nav.services") },
  { to: "/products", label: t("common.nav.products") },
  { to: "/partners", label: t("common.nav.partners") },
  { to: "/contact", label: t("common.nav.contact") },
]);

const legalItems = computed(() => [
  { to: "/news", label: t("common.nav.news") },
  { to: "/jobs", label: t("common.nav.jobs") },
  { to: "/quality-policy", label: t("pages.quality_policy.seo_title") },
  { to: "/privacy-policy", label: t("pages.privacy_policy.seo_title") },
  { to: "/legal-notice", label: t("pages.legal_notice.seo_title") },
]);

const socials = SOCIAL_LINKS;
</script>
