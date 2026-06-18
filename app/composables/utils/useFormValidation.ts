import { z } from 'zod'

export function useFormValidation<T extends z.ZodObject<z.ZodRawShape>>(schema: T) {
  const errors = reactive<Record<string, string>>({})

  const validateField = (fieldName: string, value: unknown): boolean => {
    const fieldSchema = schema.shape[fieldName] as z.ZodType | undefined
    if (!fieldSchema) return true

    const result = fieldSchema.safeParse(value)
    if (result.success) {
      delete errors[fieldName]
    } else {
      errors[fieldName] = result.error.issues[0]?.message ?? ''
    }
    return result.success
  }

  const validateForm = (data: unknown): boolean => {
    const result = schema.safeParse(data)
    if (result.success) {
      Object.keys(errors).forEach((key) => delete errors[key])
    } else {
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string
        if (fieldName) errors[fieldName] = issue.message
      })
    }
    return result.success
  }

  const clearFieldError = (fieldName: string): void => {
    delete errors[fieldName]
  }

  const clearAllErrors = (): void => {
    Object.keys(errors).forEach((key) => delete errors[key])
  }

  const isValid = computed(() => Object.keys(errors).length === 0)

  const hasError = (fieldName: string): boolean => !!errors[fieldName]

  return { errors, validateField, validateForm, clearFieldError, clearAllErrors, isValid, hasError }
}
