<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="ghost" size="sm" class="gap-1.5 text-(--primary-darkest)">
        <Globe class="size-5" />
        <span>{{ currentLocale.slice(0, 2).toUpperCase() }}</span>
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end">
      <UiDropdownMenuItem
        v-for="localeItem in availableLocales"
        :key="localeItem.code"
        @click="selectLocale(localeItem.code)"
      >
        <span class="text-base leading-none">{{ localeItem.flag }}</span>
        <span>{{ localeItem.name }}</span>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

<script setup lang="ts">
import { Globe } from '@lucide/vue'

const { currentLocale, setLocale, availableLocales } = useI18nLocale()

const selectLocale = async (localeCode: 'fr-FR' | 'en-US') => {
  await setLocale(localeCode)
}
</script>
