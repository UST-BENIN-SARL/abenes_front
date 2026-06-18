import type { ShallowRef } from 'vue'
import { useCustomToast } from '~/composables/utils/useCustomToast'

type HttpClientConfig = {
  BASE_URL?: string
  headers?: {
    'Content-Type'?: string
    Authorization?: string
    'Access-Control-Allow-Origin'?: string
    'X-App-Language'?: string
    Accept?: string
  }
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
type HttpBody = BodyInit | Record<string, unknown> | null | undefined

export type HttpClientResult<T> = {
  data: ShallowRef<T | null>
  error: Ref<{ message: string; status?: number } | null>
  pending: Ref<boolean>
}

// Endpoints that must never trigger a refresh-and-retry (avoids infinite loops)
const AUTH_ENDPOINTS: string[] = [
  Endpoints.auth.login,
  Endpoints.auth.logout,
  Endpoints.auth.refresh
]

export const useHttpClient = (config: HttpClientConfig = { BASE_URL: useBaseUrl() + '/api/' }) => {
  const { accessToken } = useAuth()
  const { t } = useI18n()

  const buildHeaders = (): Record<string, string> => {
    if (config.headers) return { ...config.headers }

    const baseHeaders: Record<string, string> = {}
    if (accessToken.value) {
      baseHeaders['Authorization'] = 'Bearer ' + accessToken.value
    }
    return baseHeaders
  }

  async function performFetch<T>(url: string, method: HttpMethod, body?: HttpBody): Promise<T> {
    const headers: Record<string, string> = {
      ...buildHeaders(),
      'X-App-Language': getCurrentLocale().value
    }

    if (import.meta.server) {
      const requestHeaders = useRequestHeaders(['cookie'])
      if (requestHeaders.cookie) {
        headers.cookie = requestHeaders.cookie
      }
    }

    return (await $fetch<T>(url, {
      method,
      baseURL: config.BASE_URL,
      body,
      credentials: 'include',
      headers
    })) as T
  }

  async function request<T>(
    url: string,
    method: HttpMethod = 'GET',
    body?: HttpBody
  ): Promise<HttpClientResult<T>> {
    const data = shallowRef<T | null>(null)
    const error = ref<{ message: string; status?: number } | null>(null)
    const pending = ref(true)

    try {
      data.value = await performFetch<T>(url, method, body)
    } catch (errorCaught: unknown) {
      const fetchError = errorCaught as { status?: number; data?: { message?: string | string[] } }

      if (fetchError.status === 401 && !AUTH_ENDPOINTS.includes(url)) {
        const { refresh } = useAuthSession()
        const refreshed = await refresh()

        if (refreshed) {
          try {
            data.value = await performFetch<T>(url, method, body)
            return { data, error, pending } as HttpClientResult<T>
          } catch (retryErrorCaught: unknown) {
            error.value = toErrorPayload(retryErrorCaught, t)
            useCustomToast(error.value.message, 'error').temporary()
            pending.value = false
            return { data, error, pending } as HttpClientResult<T>
          }
        }
      }

      error.value = toErrorPayload(fetchError, t)
      useCustomToast(error.value.message, 'error').temporary()
    } finally {
      pending.value = false
    }

    return { data, error, pending } as HttpClientResult<T>
  }

  async function post<T>(url: string, body?: HttpBody): Promise<HttpClientResult<T>> {
    return await request<T>(url, 'POST', body)
  }

  async function get<T>(url: string): Promise<HttpClientResult<T>> {
    return request<T>(url, 'GET')
  }

  async function put<T>(url: string, body: HttpBody): Promise<HttpClientResult<T>> {
    return await request<T>(url, 'PUT', body)
  }

  async function del<T = unknown>(url: string): Promise<HttpClientResult<T>> {
    return await request(url, 'DELETE')
  }

  async function patch<T>(url: string, body: HttpBody): Promise<HttpClientResult<T>> {
    return await request<T>(url, 'PATCH', body)
  }

  return { get, post, put, del, patch }
}

function toErrorPayload(
  errorCaught: unknown,
  t: (key: string) => string
): { message: string; status?: number } {
  const fetchError = errorCaught as { status?: number; data?: { message?: string | string[] } }

  const message = Array.isArray(fetchError.data?.message)
    ? fetchError.data?.message[0]
    : fetchError.data?.message

  return {
    message: message ?? t('errors.unexpected'),
    status: fetchError.status
  }
}
