export default defineNuxtRouteMiddleware(() => {
  const isAuthenticated = useAuthStatus()

  if (isAuthenticated.value) {
    return navigateTo('/')
  }
})
