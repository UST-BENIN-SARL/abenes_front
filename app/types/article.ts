export const NEWS_CATEGORIES = ['company', 'products', 'events', 'partnerships', 'health'] as const
export type NewsCategory = (typeof NEWS_CATEGORIES)[number]

export interface Article {
  slug: string
  title: string
  category: NewsCategory
  author: string
  /** ISO date string. */
  publishedAt: string
  featured?: boolean
  excerpt: string
  /** Cover photo. Leave empty to fall back to the placeholder visual. */
  image?: string
  /** Body paragraphs, rendered in order. */
  body: string[]
  keywords: string[]
}

export interface NewsFiltersState {
  search: string
  category: NewsCategory | 'all'
}
