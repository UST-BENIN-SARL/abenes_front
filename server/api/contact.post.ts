import { createContactSchema } from '#shared/utils/contactSchema'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)

  const payload = {
    firstName: formData.get('firstName')?.toString() ?? '',
    lastName: formData.get('lastName')?.toString() ?? '',
    organization: formData.get('organization')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    phone: formData.get('phone')?.toString() ?? '',
    subject: formData.get('subject')?.toString() ?? '',
    productCategories: formData.getAll('productCategories').map((value) => value.toString()),
    message: formData.get('message')?.toString() ?? ''
  }

  const schema = createContactSchema({
    required: 'This field is required.',
    email: 'Invalid email address.'
  })

  const result = schema.safeParse(payload)

  if (!result.success) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation failed',
      data: result.error.issues
    })
  }

  const attachment = formData.get('attachment')
  const attachmentInfo = attachment instanceof File && attachment.size > 0
    ? { name: attachment.name, size: attachment.size, type: attachment.type }
    : null

  // TODO: wire up real delivery (email/CRM/WhatsApp Business API) once credentials are available.
  console.info('[contact] new submission', result.data, attachmentInfo)

  return { success: true }
})
