/**
 * Restores the auth session on app init using the httpOnly refresh-token
 * cookie sent automatically by the browser. Runs on SSR (cookie forwarded
 * from the incoming request) and on the client if SSR didn't restore it.
 */
export default defineNuxtPlugin(async () => {
  const { accessToken } = useAuth()

  if (!accessToken.value) {
    const { refresh } = useAuthSession()
    await refresh()
  }
})
