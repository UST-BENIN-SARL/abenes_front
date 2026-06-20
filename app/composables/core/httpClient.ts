import type { ShallowRef } from 'vue'
import { useCustomToast } from '~/composables/utils/useCustomToast'

type HttpClientConfig = {
  BASE_URL?: string
  headers?: {
    'Content-Type'?: string
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

export const useHttpClient = (config: HttpClientConfig = { BASE_URL: useBaseUrl() + '/api/' }) => {
  const { t } = useI18n()

  async function performFetch<T>(url: string, method: HttpMethod, body?: HttpBody): Promise<T> {
    const headers: Record<string, string> = {
      ...config.headers,
      'X-App-Language': getCurrentLocale().value
    }

    return (await $fetch<T>(url, {
      method,
      baseURL: config.BASE_URL,
      body,
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
      error.value = toErrorPayload(errorCaught, t)
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
