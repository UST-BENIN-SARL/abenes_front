const COOKIE_NAME = 'cookie_consent'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 180 // 6 months

export const useCookieConsent = () => {
  const consent = useCookie<boolean | null>(COOKIE_NAME, {
    maxAge: COOKIE_MAX_AGE,
    sameSite: 'lax',
    default: () => null
  })

  const hasConsented = computed(() => consent.value === true)

  const acceptAll = () => {
    consent.value = true
  }

  return { hasConsented, acceptAll }
}
