export const useAuth = () => {
  const access_token = useLocalStorage('access_token', null)

  const user = useLocalStorage('userInfo', {})

  const clearAuthData = () => {
    access_token.value = null
    user.value = {}
  }

  return { access_token, user, clearAuthData }
}
