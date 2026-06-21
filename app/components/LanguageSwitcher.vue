<template>
  <div ref="rootEl" class="relative inline-flex">
    <button
      type="button"
      class="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-semibold text-(--primary-darkest) transition-colors hover:bg-(--background-gray)"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      @click="toggleMenu"
    >
      <Globe class="size-5" />
      <span>{{ currentLocale.slice(0, 2).toUpperCase() }}</span>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 top-full z-50 mt-2 min-w-34 overflow-hidden rounded-md border border-(--border) bg-white shadow-lg"
      role="menu"
    >
      <button
        v-for="localeItem in availableLocales"
        :key="localeItem.code"
        type="button"
        class="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-(--text-dark) transition hover:bg-(--background-gray)"
        :class="{ 'bg-(--background-gray)': localeItem.code === currentLocale }"
        role="menuitem"
        @click="selectLocale(localeItem.code)"
      >
        <span class="text-base leading-none">{{ localeItem.flag }}</span>
        <span>{{ localeItem.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Globe } from '@lucide/vue'

const rootEl = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const { currentLocale, setLocale, availableLocales } = useI18nLocale()

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const selectLocale = async (localeCode: 'fr-FR' | 'en-US') => {
  await setLocale(localeCode)
  closeMenu()
}

const handleDocumentClick = (event: MouseEvent) => {
  if (!rootEl.value) return
  if (!rootEl.value.contains(event.target as Node)) closeMenu()
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>
