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

type HttpClientResult<T> = {
  data: ShallowRef<T | null>
  error: Ref<{ message: string } | null>
  pending: Ref<boolean>
}

export const useHttpClient = (config: HttpClientConfig = { BASE_URL: useBaseUrl() + '/api/' }) => {
  const { access_token } = useAuth()

  const headers =
    config.headers ||
    (() => {
      const baseHeaders: Record<string, string> = {}
      if (access_token.value) {
        baseHeaders['Authorization'] = 'Bearer ' + access_token.value
      }
      return baseHeaders
    })()

  async function request<T>(
    url: string,
    method: HttpMethod = 'GET',
    body?: HttpBody
  ): Promise<HttpClientResult<T>> {
    const data = shallowRef<T | null>(null)
    const error = ref<{ message: string } | null>(null)
    const pending = ref(true)

    try {
      const response = await $fetch<T>(url, {
        method: method,
        baseURL: config.BASE_URL,
        body: body,
        headers: {
          ...headers,
          'X-App-Language': getCurrentLocale().value == 'en-US' ? 'en-EN' : 'fr-FR',
        }
      })
      data.value = response
    } catch (errorCaught: unknown) {
      const fetchError = errorCaught as { data?: { message?: string | string[] } }

      if (fetchError.data?.message) {
        error.value = Array.isArray(fetchError.data.message)
          ? { message: fetchError.data.message[0] }
          : { message: fetchError.data.message }
      } else {
        error.value = { message: 'Erreur inattendue lors de la requête' }
      }
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
    const response = await request<T>(url, 'GET')
    return response
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
