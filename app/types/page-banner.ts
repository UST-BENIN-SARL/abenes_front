export interface PageBannerCrumb {
  label: string
  to?: string
}

export interface PageBannerMeta {
  /** i18n key for the H1. Ignored when `titleParam` or `title` is set. */
  titleKey?: string
  /** i18n key for the optional subtitle. */
  subtitleKey?: string
  /** i18n key for this page's own breadcrumb label (static pages). */
  breadcrumbKey?: string
  /** i18n key + path for an ancestor breadcrumb (e.g. a listing page). */
  parentKey?: string
  parentTo?: string
  /** Route param used as both the title and the final breadcrumb label (e.g. `[slug]` pages). Ignored when `title` is set. */
  titleParam?: string
  /**
   * Literal title/breadcrumb override, used as-is instead of `titleParam`/`titleKey`.
   * Set it reactively from the page once async data resolves, e.g.
   * `route.meta.pageBanner.title = product.value?.name`.
   */
  title?: string
}

declare module '#app' {
  interface PageMeta {
    pageBanner?: PageBannerMeta
  }
}

export {}
