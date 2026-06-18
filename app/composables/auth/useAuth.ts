/**
 * In-memory (per-request on SSR, in-memory on client) auth state.
 * The refresh token lives in an httpOnly cookie set by the backend and is
 * never exposed to JS — see useAuthSession() for session restoration.
 */
export const useAuth = () => {
  const accessToken = useState<string | null>('accessToken', () => null)
  const user = useState<User | null>('user', () => null)

  const setSession = (token: string, sessionUser: User) => {
    accessToken.value = token
    user.value = sessionUser
  }

  const clearAuthData = () => {
    accessToken.value = null
    user.value = null
  }

  return { accessToken, user, setSession, clearAuthData }
}
