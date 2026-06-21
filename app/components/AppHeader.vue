<template>
  <header
    class="container mx-auto flex items-center justify-between bg-white px-3 py-5 text-black"
  >
    <NuxtLink to="/">
      <NuxtImg src="/images/logo.png" alt="ABENES SARL" class="h-16 w-auto" />
    </NuxtLink>

    <nav>
      <ul class="flex items-center gap-6">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            class="relative pb-2.5 text-[15px] text-(--text-dark) transition-colors after:absolute after:bottom-0 after:left-1/2 after:h-1.5 after:w-1.5 after:-translate-x-1/2 after:scale-0 after:rounded-full after:bg-(--primary) after:opacity-0 after:transition-all hover:text-(--primary) [&.router-link-active]:text-(--primary) [&.router-link-active]:after:scale-100 [&.router-link-active]:after:opacity-100"
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
        <button
          type="button"
          aria-label="Rechercher"
          class="text-(--text-dark) hover:text-(--primary)"
        >
          <Search class="size-6" />
        </button>
      </div>
      <UiButton as-child size="lg">
        <NuxtLink to="/contact" class="font-semibold px-2">Demander un devis</NuxtLink>
      </UiButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Search } from "@lucide/vue";

const navItems = [
  { to: "/about", label: "Qui sommes-nous ?" },
  { to: "/services", label: "Nos services" },
  { to: "/products", label: "Nos produits" },
  { to: "/achievements", label: "Réalisations" },
  { to: "/news", label: "Actualités" },
  { to: "/jobs", label: "Carrières" },
  { to: "/contact", label: "Contact" },
];
</script>
