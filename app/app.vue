<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div :lang="cookieLocale">
    <CookieControl :locale="cookieLocale">
      <template #bar>
        <div class="cookieControl__GdprBadge mb-2" aria-hidden="true">
          <span class="cookieControl__CookieEmoji cookieControl__CookieEmoji--back">🍪</span>
          <span class="cookieControl__CookieEmoji cookieControl__CookieEmoji--front">🍪</span>
        </div>
        <h2 class="mb-2">{{ $t('common.cookie_consent.title') }}</h2>
        <p>{{ $t('common.cookie_consent.bar_text') }}</p>
      </template>
      <template #modal>
        <h2>{{ $t('common.cookie_consent.title') }}</h2>
        <p>{{ $t('common.cookie_consent.modal_text') }}</p>
      </template>
    </CookieControl>
    <CookieIframe />
  </div>
</template>

<script setup lang="ts">
const { currentLocale } = useI18nLocale()
const cookieLocale = computed(() => (currentLocale.value.startsWith('fr') ? 'fr' : 'en'))
</script>
