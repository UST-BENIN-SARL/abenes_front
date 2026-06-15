import { z, type ZodSchema } from 'zod'

/**
 * Reusable form validation composable using Zod
 * @param schema - Zod validation schema
 * @returns Validation utilities
 */
export function useFormValidation<T extends ZodSchema>(schema: T) {
  // Reactive errors object
  const errors = reactive<Record<string, string>>({})

  /**
   * Validate a single field
   * @param fieldName - Name of the field to validate
   * @param value - Value to validate
   */
  const validateField = (fieldName: string, value: unknown): boolean => {
    try {
      const fieldSchema = (schema as any).shape?.[fieldName]

      if (!fieldSchema) {
        return true
      }

      fieldSchema.parse(value)

      errors[fieldName] = ''
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors[fieldName] = error.issues[0]?.message || 'Erreur de validation'
      }
      return false
    }
  }

  /**
   * Validate the entire form
   * @param data - Form data object
   * @returns True if valid, false otherwise
   */
  const validateForm = (data: unknown): boolean => {
    try {
      schema.parse(data)

      Object.keys(errors).forEach((key) => {
        errors[key] = ''
      })

      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as string
          if (fieldName) {
            errors[fieldName] = issue.message
          }
        })
      }
      return false
    }
  }

  /**
   * Clear error for a specific field
   * @param fieldName - Name of the field
   */
  const clearFieldError = (fieldName: string): void => {
    if (errors[fieldName]) {
      errors[fieldName] = ''
    }
  }

  /**
   * Clear all errors
   */
  const clearAllErrors = (): void => {
    Object.keys(errors).forEach((key) => {
      errors[key] = ''
    })
  }

  /**
   * Check if form is valid (no errors)
   */
  const isValid = computed(() => {
    return Object.values(errors).every((error) => !error)
  })

  /**
   * Check if a specific field has an error
   */
  const hasError = (fieldName: string): boolean => {
    return !!errors[fieldName]
  }

  return {
    errors,
    validateField,
    validateForm,
    clearFieldError,
    clearAllErrors,
    isValid,
    hasError
  }
}
