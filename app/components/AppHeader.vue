<template>
  <header class="bg-white text-black">
    <div class="container mx-auto flex items-center justify-between px-3 py-3">
      <NuxtLink to="/">
        <NuxtImg src="/images/logo.png" alt="ABENES SARL" class="h-16 w-auto" />
      </NuxtLink>

      <nav>
        <ul class="flex items-center gap-6">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="relative pb-2.5 font-semibold text-[16px] text-(--text-dark) transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:scale-0 after:rounded-full after:bg-(--primary) after:opacity-0 after:transition-all hover:text-(--primary) [&.router-link-active]:text-(--primary) [&.router-link-active]:after:scale-100 [&.router-link-active]:after:opacity-100"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-4">
        <div class="flex items-center gap-3">
          <LanguageSwitcher />
          <span class="h-6 w-px bg-gray-400" aria-hidden="true" />
          <UiButton
            variant="ghost"
            size="icon"
            aria-label="Rechercher"
            :aria-expanded="isSearchOpen"
            @click="isSearchOpen = !isSearchOpen"
          >
            <Search class="size-5" />
          </UiButton>
        </div>
        <UiButton as-child size="lg">
          <NuxtLink to="/contact" class="font-semibold px-2">Demander un devis</NuxtLink>
        </UiButton>
      </div>
    </div>

    <div v-if="isSearchOpen" class="border-t border-(--border) bg-(--background-gray)">
      <div class="container mx-auto flex items-center gap-2 px-3 py-3">
        <Search class="size-4 shrink-0 text-(--text-secondary)" />
        <input
          type="search"
          placeholder="Rechercher un produit, un service..."
          class="w-full bg-transparent text-sm text-(--text-dark) placeholder:text-(--text-secondary) focus:outline-none"
        >
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Search } from '@lucide/vue'

const isSearchOpen = ref(false)

const navItems = [
  { to: '/about', label: 'Qui sommes-nous ?' },
  { to: '/services', label: 'Nos services' },
  { to: '/products', label: 'Nos produits' },
  { to: '/news', label: 'Actualités' },
  { to: '/jobs', label: 'Carrières' },
  { to: '/contact', label: 'Contact' }
]
</script>
