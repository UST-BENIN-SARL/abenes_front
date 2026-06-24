import type { PageBannerCrumb } from '~/types/page-banner'

export function usePageBanner() {
  const route = useRoute()
  const { t } = useI18n()

  const meta = computed(() => route.meta.pageBanner)

  const title = computed(() => {
    if (!meta.value) return ''
    if (meta.value.title) return meta.value.title
    if (meta.value.titleParam) {
      return String(route.params[meta.value.titleParam] ?? '')
    }
    return meta.value.titleKey ? t(meta.value.titleKey) : ''
  })

  const subtitle = computed(() => (meta.value?.subtitleKey ? t(meta.value.subtitleKey) : undefined))

  const breadcrumbs = computed<PageBannerCrumb[]>(() => {
    if (!meta.value) return []

    const crumbs: PageBannerCrumb[] = []

    if (meta.value.parentKey) {
      crumbs.push({ label: t(meta.value.parentKey), to: meta.value.parentTo })
    }

    if (meta.value.title || meta.value.titleParam) {
      crumbs.push({ label: title.value })
    } else if (meta.value.breadcrumbKey) {
      crumbs.push({ label: t(meta.value.breadcrumbKey) })
    }

    return crumbs
  })

  return {
    show: computed(() => Boolean(meta.value)),
    title,
    subtitle,
    breadcrumbs
  }
}
