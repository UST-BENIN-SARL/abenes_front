import type { LocaleOption } from '~/types/i18n'

export function useI18nLocale() {
  const { locale } = useI18n()
  const nuxtApp = useNuxtApp()
  const { t } = useI18n()

  const i18n = nuxtApp.$i18n as {
    setLocale: (locale: 'fr-FR' | 'en-US') => Promise<void>
  }

  const availableLocales = computed<LocaleOption[]>(() => [
    { code: 'fr-FR', name: t('common.locales.fr-FR'), flag: '🇫🇷' },
    { code: 'en-US', name: t('common.locales.en-US'), flag: '🇺🇸' }
  ])

  const currentLocale = computed(() => locale.value)

  const setLocale = async (newLocale: 'fr-FR' | 'en-US') => {
    if (locale.value === newLocale) return
    if (!availableLocales.value.some((l) => l.code === newLocale)) return

    await i18n.setLocale(newLocale)

    if (import.meta.client) {
      localStorage.setItem('locale', newLocale)
    }
  }

  const getCurrentLocaleOption = computed(() =>
    availableLocales.value.find((l) => l.code === currentLocale.value)
  )

  return {
    currentLocale,
    availableLocales,
    setLocale,
    getCurrentLocaleOption
  }
}
