import { z } from 'zod'

export function createJobApplicationSchema(messages: {
  required: string
  email: string
}) {
  return z.object({
    firstName: z.string().min(1, messages.required),
    lastName: z.string().min(1, messages.required),
    email: z.string().min(1, messages.required).email(messages.email),
    phone: z.string().optional(),
    jobSlug: z.string().min(1, messages.required),
    jobTitle: z.string().min(1, messages.required),
    message: z.string().optional()
  })
}

export type JobApplicationPayload = z.infer<ReturnType<typeof createJobApplicationSchema>>
