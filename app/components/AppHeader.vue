<template>
  <header class="flex items-center justify-between bg-(--primary-darkest) px-4 py-3 text-white">
    <NuxtLink to="/" class="text-lg font-extrabold">ABENES SARL</NuxtLink>

    <nav class="hidden items-center gap-6 text-sm font-semibold sm:flex">
      <NuxtLink to="/" class="hover:text-(--gray-blue)">{{ $t('common.nav.home') }}</NuxtLink>
    </nav>

    <LanguageSwitcher />
  </header>
</template>
