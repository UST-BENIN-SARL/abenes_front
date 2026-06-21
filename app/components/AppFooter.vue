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
              Navigation
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
              Informations
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
              Contact
            </h3>
            <ul class="mt-4 space-y-3 text-sm text-white/80">
              <li class="flex items-center gap-2">
                <MapPin class="size-4 shrink-0" />
                <span>Cotonou, Bénin</span>
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
import { MapPin, Phone } from "@lucide/vue";

const year = new Date().getFullYear();

const navItems = [
  { to: "/about", label: "Qui sommes-nous ?" },
  { to: "/services", label: "Nos services" },
  { to: "/products", label: "Nos produits" },
  { to: "/partners", label: "Partenaires" },
  { to: "/contact", label: "Contact" },
];

const legalItems = [
  { to: "/news", label: "Actualités" },
  { to: "/jobs", label: "Carrières" },
  { to: "/privacy-policy", label: "Politique de confidentialité" },
  { to: "/legal-notice", label: "Mentions légales" },
];

const FACEBOOK_ICON =
  '<svg viewBox="0 0 24 24" class="size-4" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v2h2.8L15.9 15h-2.4v7A10 10 0 0 0 22 12Z"/></svg>';
const LINKEDIN_ICON =
  '<svg viewBox="0 0 24 24" class="size-4" fill="currentColor"><path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM7 20.4H3.6V9H7v11.4ZM22.2 0H1.8C.8 0 0 .8 0 1.8v20.4C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.8V1.8C24 .8 23.2 0 22.2 0Z"/></svg>';
const INSTAGRAM_ICON =
  '<svg viewBox="0 0 24 24" class="size-4" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.2 2.4.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.3 1.2.4 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.9-.4 2.4-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.2.3-2.4.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.2-2.4-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.3-1.2-.4-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.9.4-2.4.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.2-.3 2.4-.4C8.4 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.2 0-3.5 0-4.8.1-1 .1-1.5.2-1.9.3-.5.2-.8.4-1.1.7-.3.3-.5.6-.7 1.1-.1.4-.3.9-.3 1.9-.1 1.3-.1 1.6-.1 4.8s0 3.5.1 4.8c.1 1 .2 1.5.3 1.9.2.5.4.8.7 1.1.3.3.6.5 1.1.7.4.1.9.3 1.9.3 1.3.1 1.6.1 4.8.1s3.5 0 4.8-.1c1-.1 1.5-.2 1.9-.3.5-.2.8-.4 1.1-.7.3-.3.5-.6.7-1.1.1-.4.3-.9.3-1.9.1-1.3.1-1.6.1-4.8s0-3.5-.1-4.8c-.1-1-.2-1.5-.3-1.9-.2-.5-.4-.8-.7-1.1-.3-.3-.6-.5-1.1-.7-.4-.1-.9-.3-1.9-.3-1.3-.1-1.6-.1-4.8-.1Zm0 3.6a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8Zm0 1.8a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Zm5.6-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"/></svg>';

const socials = [
  { name: "Facebook", href: "#", icon: FACEBOOK_ICON },
  { name: "LinkedIn", href: "#", icon: LINKEDIN_ICON },
  { name: "Instagram", href: "#", icon: INSTAGRAM_ICON },
];
</script>
