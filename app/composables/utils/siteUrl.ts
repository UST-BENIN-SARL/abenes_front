export function useSiteUrl() {
  const config = useRuntimeConfig()
  return config.public.siteUrl
}
