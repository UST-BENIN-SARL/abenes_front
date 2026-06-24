import { z } from 'zod'

export const CONTACT_SUBJECTS = [
  'quote',
  'product',
  'support',
  'partnership',
  'career',
  'other'
] as const

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]

export const PRODUCT_CATEGORIES = [
  'diagnostic',
  'laboratory',
  'furniture',
  'reagents',
  'maintenance',
  'parts',
  'other'
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export function createContactSchema(messages: {
  required: string
  email: string
}) {
  return z.object({
    firstName: z.string().min(1, messages.required),
    lastName: z.string().min(1, messages.required),
    organization: z.string().optional(),
    email: z.string().min(1, messages.required).email(messages.email),
    phone: z.string().optional(),
    subject: z.enum(CONTACT_SUBJECTS, { message: messages.required }),
    productCategories: z.array(z.string()).optional(),
    message: z.string().min(10, messages.required),
  })
}

export type ContactPayload = z.infer<ReturnType<typeof createContactSchema>>
