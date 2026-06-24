import { PRODUCTS } from '~/data/products'
import type { Product } from '~/types/product'

export function useProducts() {
  const getProductBySlug = (slug: string): Product | undefined => PRODUCTS.find((product) => product.slug === slug)

  const getRelatedProducts = (product: Product, limit = 3): Product[] =>
    PRODUCTS.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, limit)

  return {
    products: PRODUCTS,
    getProductBySlug,
    getRelatedProducts
  }
}
