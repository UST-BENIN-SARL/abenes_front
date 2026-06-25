<template>
  <header class="bg-white text-black">
    <div class="container mx-auto flex items-center justify-between px-3 py-3">
      <NuxtLink to="/">
        <NuxtImg src="/images/logo.png" alt="ABENES SARL" class="h-16 w-auto" />
      </NuxtLink>

      <nav class="hidden lg:block">
        <ul class="flex items-center gap-6">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="relative pb-2.5 text-[16px] font-semibold text-(--text-dark) transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:scale-0 after:rounded-full after:bg-(--primary) after:opacity-0 after:transition-all hover:text-(--primary) [&.router-link-active]:text-(--primary) [&.router-link-active]:after:scale-100 [&.router-link-active]:after:opacity-100"
            >
              {{ $t(item.labelKey) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-2 sm:gap-3">
        <LanguageSwitcher />
        <span class="hidden h-6 w-px bg-gray-300 sm:block" aria-hidden="true" />
        <UiButton
          variant="ghost"
          size="icon"
          :aria-label="$t('common.nav.search')"
          :aria-expanded="isSearchOpen"
          @click="isSearchOpen = !isSearchOpen; isMobileMenuOpen = false"
        >
          <Search class="size-5" />
        </UiButton>
        <UiButton as-child size="lg" class="hidden lg:flex">
          <NuxtLink to="/contact" class="px-2 font-semibold">{{ $t('common.nav.cta') }}</NuxtLink>
        </UiButton>
        <UiButton
          variant="ghost"
          size="icon"
          class="lg:hidden"
          :aria-label="isMobileMenuOpen ? $t('common.nav.close_menu') : $t('common.nav.open_menu')"
          :aria-expanded="isMobileMenuOpen"
          @click="isMobileMenuOpen = !isMobileMenuOpen; isSearchOpen = false"
        >
          <X v-if="isMobileMenuOpen" class="size-5" />
          <Menu v-else class="size-5" />
        </UiButton>
      </div>
    </div>

    <div v-if="isSearchOpen" class="border-t border-(--border) bg-(--background-gray)">
      <div class="container mx-auto flex items-center gap-2 px-3 py-3">
        <Search class="size-4 shrink-0 text-(--text-secondary)" />
        <input
          type="search"
          :placeholder="$t('common.nav.search_placeholder')"
          class="w-full bg-transparent text-sm text-(--text-dark) placeholder:text-(--text-secondary) focus:outline-none"
        >
      </div>
    </div>

    <div v-if="isMobileMenuOpen" class="border-t border-(--border) bg-white lg:hidden">
      <nav class="container mx-auto px-4 py-4">
        <ul class="flex flex-col">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="flex items-center py-3 text-base font-semibold text-(--text-dark) transition-colors hover:text-(--primary) [&.router-link-active]:text-(--primary)"
              @click="isMobileMenuOpen = false"
            >
              {{ $t(item.labelKey) }}
            </NuxtLink>
          </li>
        </ul>
        <div class="mt-4 border-t border-(--border) pt-4">
          <UiButton as-child class="w-full">
            <NuxtLink to="/contact" @click="isMobileMenuOpen = false">
              {{ $t('common.nav.cta') }}
            </NuxtLink>
          </UiButton>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu, Search, X } from '@lucide/vue'

const isSearchOpen = ref(false)
const isMobileMenuOpen = ref(false)

const route = useRoute()
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
  isSearchOpen.value = false
})

const navItems = [
  { to: '/about', labelKey: 'common.nav.about' },
  { to: '/services', labelKey: 'common.nav.services' },
  { to: '/products', labelKey: 'common.nav.products' },
  { to: '/news', labelKey: 'common.nav.news' },
  { to: '/jobs', labelKey: 'common.nav.jobs' },
  { to: '/contact', labelKey: 'common.nav.contact' }
]
</script>
