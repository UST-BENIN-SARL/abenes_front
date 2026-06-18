import type { HttpClientResult } from '~/composables/core/httpClient'

export const useUser = () => {
  const { get, post } = useHttpClient()
  const { t } = useI18n()
  const isLoading = ref(false)

  async function call<T>(
    fn: () => Promise<HttpClientResult<T>>
  ): Promise<{ success: boolean; data: T | null }> {
    isLoading.value = true
    try {
      const { data, error } = await fn()
      if (error.value) return { success: false, data: null }
      return { success: !!data.value, data: data.value }
    } finally {
      isLoading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    const { success, data } = await call<LoginResponse>(() =>
      post(Endpoints.auth.login, { email, password })
    )

    if (success && data) {
      useAuth().setSession(data.token, data.user)
      useCustomToast(t('common.user.login_success'), 'success').temporary()
    }

    return { success }
  }

  const logout = async () => {
    await call(() => post(Endpoints.auth.logout, {}))
    useAuth().clearAuthData()
    await navigateTo('/login', { replace: true })
    useCustomToast(t('common.user.logout_success'), 'success').temporary()
  }

  const me = async () => {
    const { data } = await call(() => get(Endpoints.auth.me))
    return { data }
  }

  return {
    isLoading,
    login,
    logout,
    me
  }
}
