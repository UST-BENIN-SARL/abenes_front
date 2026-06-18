const decodeBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  if (typeof atob === 'function') {
    return atob(normalized)
  }
  return Buffer.from(normalized, 'base64').toString('utf-8')
}

const isJwtExpired = (token: string) => {
  const parts = token.split('.')
  if (parts.length !== 3 || !parts[1]) return false

  try {
    const payload = JSON.parse(decodeBase64Url(parts[1]))
    if (!payload || typeof payload.exp !== 'number') return false
    return Date.now() >= payload.exp * 1000
  } catch {
    return false
  }
}

export const useAuthStatus = () => {
  const { accessToken } = useAuth()

  const isAuthenticated = computed(() => {
    const token = accessToken.value

    if (!token || token.trim().length === 0) {
      return false
    }

    return !isJwtExpired(token)
  })

  return isAuthenticated
}
