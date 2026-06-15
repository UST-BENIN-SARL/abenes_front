export default defineNuxtPlugin((nuxtApp) => {
  // if (!import.meta.client) return

  // const { access_token, clearAuthData } = useAuth()
  // let timeoutId: ReturnType<typeof setTimeout> | null = null
  // const inactivityTimeout = 30 * 60 * 1000 // 30 minutes

  // const handleLogout = async () => {
  //   await clearAuthData()
  //   await navigateTo('/login', { replace: true })
  // }

  // const resetTimeout = () => {
  //   if (timeoutId) {
  //     clearTimeout(timeoutId)
  //     timeoutId = null
  //   }

  //   if (access_token.value) {
  //     timeoutId = setTimeout(handleLogout, inactivityTimeout)
  //   }
  // }

  // const eventListeners: Array<{ event: string; listener: () => void }> = [
  //   { event: 'click', listener: resetTimeout },
  //   { event: 'mousemove', listener: resetTimeout },
  //   { event: 'keydown', listener: resetTimeout },
  //   { event: 'scroll', listener: resetTimeout },
  //   { event: 'touchstart', listener: resetTimeout }
  // ]

  // const addEventListeners = () => {
  //   eventListeners.forEach(({ event, listener }) => {
  //     document.addEventListener(event, listener, { passive: true })
  //   })
  // }

  // const removeEventListeners = () => {
  //   eventListeners.forEach(({ event, listener }) => {
  //     document.removeEventListener(event, listener)
  //   })
  // }

  // addEventListeners()

  // if (access_token.value) {
  //   resetTimeout()
  // }

  // watch(access_token, (newToken) => {
  //   if (newToken) {
  //     resetTimeout()
  //   } else {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId)
  //       timeoutId = null
  //     }
  //   }
  // })

  // if ((import.meta as any).hot) {
  //   ;(import.meta as any).hot.dispose(() => {
  //     removeEventListeners()
  //     if (timeoutId) {
  //       clearTimeout(timeoutId)
  //       timeoutId = null
  //     }
  //   })
  // }
})
