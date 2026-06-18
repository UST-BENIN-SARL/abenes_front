/**
 * Auth-related types.
 * Lives in shared/types so both app/ (composables, pages) and server/api
 * routes can use the same contracts without duplicating them — no manual
 * import needed, Nuxt auto-imports everything under shared/types.
 */

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  userType: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface RefreshResponse {
  token: string
  user: User
}
