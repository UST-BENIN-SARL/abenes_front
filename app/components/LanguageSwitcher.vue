<template>
  <div ref="rootEl" class="relative inline-flex">
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      @click="toggleMenu"
    >
      <span class="text-base leading-none">{{ currentOption.flag }}</span>
      <span class="hidden sm:inline">{{ currentOption.name }}</span>
      <Icon
        name="mdi:chevron-down"
        class="text-white/80 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 top-full z-50 mt-2 min-w-44 overflow-hidden rounded-lg border border-white/10 bg-(--success-variant) shadow-lg"
      role="menu"
    >
      <button
        v-for="localeItem in availableLocales"
        :key="localeItem.code"
        type="button"
        class="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-white transition hover:bg-white/10"
        :class="{ 'bg-white/10': localeItem.code === currentLocale }"
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
const rootEl = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const { currentLocale, setLocale, availableLocales } = useI18nLocale()

const currentOption = computed(() => {
  return (
    availableLocales.value.find((locale) => locale.code === currentLocale.value) ??
    availableLocales.value[0]!
  )
})

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
