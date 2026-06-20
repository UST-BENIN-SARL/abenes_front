<template>
  <div
    v-if="!hasConsented"
    class="fixed inset-0 z-100 flex items-end justify-center bg-black/60 p-4 sm:items-center"
    role="dialog"
    aria-modal="true"
    :aria-label="$t('common.cookie_consent.title')"
  >
    <div class="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="text-lg font-bold text-(--text-title)">{{ $t('common.cookie_consent.title') }}</h2>
      <p class="mt-2 text-sm text-(--text-secondary)">{{ $t('common.cookie_consent.message') }}</p>

      <button
        type="button"
        class="mt-4 w-full rounded-lg bg-(--primary) px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-(--primary-dark)"
        @click="acceptAll"
      >
        {{ $t('common.cookie_consent.accept') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { hasConsented, acceptAll } = useCookieConsent()

if (import.meta.client) {
  watchEffect(() => {
    document.body.style.overflow = hasConsented.value ? '' : 'hidden'
  })
}
</script>
