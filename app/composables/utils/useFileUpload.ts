export interface FileUploadConfig {
  acceptedTypes?: string[]
  maxSize?: number // in bytes
}

const DEFAULT_CONFIG: Required<FileUploadConfig> = {
  acceptedTypes: [
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  maxSize: 5 * 1024 * 1024 // 5MB
}

/**
 * Reusable file upload composable
 * @param config - Upload configuration
 * @returns File upload utilities
 */
export function useFileUpload(config: FileUploadConfig = {}) {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config }

  // State
  const file = ref<File | null>(null)
  const fileError = ref<string>('')

  // Computed
  const fileName = computed(() => file.value?.name || '')
  const hasFile = computed(() => !!file.value)

  /**
   * Validate file type and size
   * @param fileToValidate - File to validate
   * @returns Error message or null if valid
   */
  const validateFile = (fileToValidate: File): string | null => {
    // Check file type
    if (!mergedConfig.acceptedTypes.includes(fileToValidate.type)) {
      return 'Format de fichier non accepté (PDF, JPG, PNG, DOC, DOCX uniquement)'
    }

    // Check file size
    if (fileToValidate.size > mergedConfig.maxSize) {
      const maxSizeMB = mergedConfig.maxSize / (1024 * 1024)
      return `Le fichier ne doit pas dépasser ${maxSizeMB} Mo`
    }

    return null
  }

  /**
   * Handle file selection from input
   * @param event - Input change event
   */
  const handleFileSelect = (event: Event): void => {
    const target = event.target as HTMLInputElement
    const selectedFile = target.files?.[0]

    if (!selectedFile) {
      return
    }

    // Validate file
    const error = validateFile(selectedFile)

    if (error) {
      fileError.value = error
      file.value = null
      // Reset input
      target.value = ''
      return
    }

    // Set file and clear error
    file.value = selectedFile
    fileError.value = ''
  }

  /**
   * Clear selected file
   */
  const clearFile = (): void => {
    file.value = null
    fileError.value = ''
  }

  /**
   * Trigger file input click programmatically
   * @param inputRef - Ref to the file input element
   */
  const triggerFileInput = (inputRef: Ref<HTMLInputElement | null>): void => {
    inputRef.value?.click()
  }

  return {
    file,
    fileName,
    hasFile,
    fileError,
    handleFileSelect,
    clearFile,
    validateFile,
    triggerFileInput
  }
}
