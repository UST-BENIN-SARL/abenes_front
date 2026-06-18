/**
 * Handles restoring/refreshing the access token using the httpOnly
 * refresh-token cookie set by the backend.
 */
export const useAuthSession = () => {
  const { setSession, clearAuthData } = useAuth()

  const refresh = async (): Promise<boolean> => {
    try {
      const headers: Record<string, string> = {}

      if (import.meta.server) {
        const requestHeaders = useRequestHeaders(['cookie'])
        if (requestHeaders.cookie) {
          headers.cookie = requestHeaders.cookie
        }
      }

      const response = await $fetch<RefreshResponse>(Endpoints.auth.refresh, {
        method: 'POST',
        baseURL: useBaseUrl() + '/api/',
        credentials: 'include',
        headers
      })

      setSession(response.token, response.user)
      return true
    } catch {
      clearAuthData()
      return false
    }
  }

  return { refresh }
}
