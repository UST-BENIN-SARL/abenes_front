import type { ContactSubject } from '#shared/utils/contactSchema'
import type { Product, ProductAvailability } from '~/types/product'

export function buildProductQuoteLink(product: Product, subject: ContactSubject = 'quote') {
  return {
    path: '/contact',
    query: {
      subject,
      category: product.category,
      product: product.name
    }
  }
}

export function productAvailabilityTone(availability: ProductAvailability) {
  switch (availability) {
    case 'in_stock':
      return { dot: 'bg-(--success)', text: 'text-(--success)' }
    case 'on_order':
      return { dot: 'bg-(--warning)', text: 'text-(--text-dark)' }
    default:
      return { dot: 'bg-(--text-secondary)', text: 'text-(--text-secondary)' }
  }
}
