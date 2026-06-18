export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const { accessToken, clearAuthData } = useAuth()
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  const inactivityTimeout = 30 * 60 * 1000 // 30 minutes

  const handleLogout = async () => {
    clearAuthData()
    await navigateTo('/login', { replace: true })
  }

  const resetTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }

    if (accessToken.value) {
      timeoutId = setTimeout(handleLogout, inactivityTimeout)
    }
  }

  const eventListeners: Array<{ event: string; listener: () => void }> = [
    { event: 'click', listener: resetTimeout },
    { event: 'mousemove', listener: resetTimeout },
    { event: 'keydown', listener: resetTimeout },
    { event: 'scroll', listener: resetTimeout },
    { event: 'touchstart', listener: resetTimeout }
  ]

  eventListeners.forEach(({ event, listener }) => {
    document.addEventListener(event, listener, { passive: true })
  })

  if (accessToken.value) {
    resetTimeout()
  }

  watch(accessToken, (newToken) => {
    if (newToken) {
      resetTimeout()
    } else if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  })
})
