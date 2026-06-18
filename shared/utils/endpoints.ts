/**
 * Paths on the upstream backend (the external API at NUXT_PUBLIC_BASE_URL).
 * Lives in shared/utils so it's auto-imported in both app/ (httpClient calling
 * the backend directly) and server/api (Nitro routes proxying to the backend).
 */

export const Endpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    me: '/auth/me',
    refresh: '/auth/refresh'
  }
} as const
