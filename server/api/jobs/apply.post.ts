import { createJobApplicationSchema } from '#shared/utils/jobApplicationSchema'

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event)

  const payload = {
    firstName: formData.get('firstName')?.toString() ?? '',
    lastName: formData.get('lastName')?.toString() ?? '',
    email: formData.get('email')?.toString() ?? '',
    phone: formData.get('phone')?.toString() ?? '',
    jobSlug: formData.get('jobSlug')?.toString() ?? '',
    jobTitle: formData.get('jobTitle')?.toString() ?? '',
    message: formData.get('message')?.toString() ?? ''
  }

  const schema = createJobApplicationSchema({
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

  const cv = formData.get('cv')
  if (!(cv instanceof File) || cv.size === 0) {
    throw createError({
      statusCode: 422,
      statusMessage: 'A resume file is required'
    })
  }

  const cvInfo = { name: cv.name, size: cv.size, type: cv.type }

  // TODO: wire up real delivery (email/ATS) once credentials are available.
  console.info('[jobs] new application', result.data, cvInfo)

  return { success: true }
})
