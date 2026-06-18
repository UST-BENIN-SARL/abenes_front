// Example Nitro route — template for when real server/api routes are added.
//
// Why a route here at all: today the SPA calls the upstream backend directly
// from the browser (see app/composables/core/httpClient.ts + useBaseUrl()).
// A server/api/* route turns this into a BFF (Backend-For-Frontend) proxy:
// the browser calls our own /api/auth/me, and this handler forwards the
// request to the real backend. Reasons to do that later:
//   - hide the upstream base URL from the client bundle
//   - attach secrets (API keys, server-only tokens) that must never reach JS
//   - normalize/aggregate several upstream calls into one response
//
// Pattern to copy for any new server route:
//   1. Reuse the same path constants from shared/utils/endpoints.ts (Endpoints)
//      instead of hardcoding the upstream path — one source of truth for both
//      the client httpClient and server proxies.
//   2. Reuse the same contracts from shared/types/*.ts (here: User) instead of
//      redeclaring response shapes — the client and the route stay in sync.
//   3. Forward only what's needed (Authorization header / cookies), never log
//      tokens, and let $fetch errors bubble as-is so the client's existing
//      401-refresh handling in httpClient.ts keeps working unchanged.

export default defineEventHandler(async (event): Promise<User> => {
  const { baseUrl } = useRuntimeConfig(event).public
  const authorization = getRequestHeader(event, 'authorization')

  return await $fetch<User>(Endpoints.auth.me, {
    baseURL: baseUrl + '/api/',
    headers: authorization ? { authorization } : undefined
  })
})
