import type { ProductCategory } from '#shared/utils/contactSchema'

export type ProductAvailability = 'in_stock' | 'on_order' | 'quote_only'

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  slug: string
  name: string
  brand: string
  category: ProductCategory
  availability: ProductAvailability
  /** Shown first in the default sort order. */
  featured?: boolean
  shortDescription: string
  description: string
  highlights?: string[]
  specs?: ProductSpec[]
  /** Photo URLs. Leave empty to fall back to the placeholder visual. */
  images: string[]
  /** Link to a downloadable PDF spec sheet. Omit until a real file is available. */
  datasheetUrl?: string
}

export interface ProductFiltersState {
  search: string
  categories: string[]
  brands: string[]
  availabilities: ProductAvailability[]
}
