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

export function useFileUpload(config: FileUploadConfig = {}) {
  const { t } = useI18n()
  const mergedConfig = { ...DEFAULT_CONFIG, ...config }

  const file = ref<File | null>(null)
  const fileError = ref<string>('')

  const fileName = computed(() => file.value?.name || '')
  const hasFile = computed(() => !!file.value)

  const validateFile = (fileToValidate: File): string | null => {
    if (!mergedConfig.acceptedTypes.includes(fileToValidate.type)) {
      return t('validation.file.invalid_type')
    }

    if (fileToValidate.size > mergedConfig.maxSize) {
      const maxSizeMB = mergedConfig.maxSize / (1024 * 1024)
      return t('validation.file.max_size', { max: maxSizeMB })
    }

    return null
  }

  const handleFileSelect = (event: Event): void => {
    const target = event.target as HTMLInputElement
    const selectedFile = target.files?.[0]

    if (!selectedFile) return

    const error = validateFile(selectedFile)

    if (error) {
      fileError.value = error
      file.value = null
      target.value = ''
      return
    }

    file.value = selectedFile
    fileError.value = ''
  }

  const clearFile = (): void => {
    file.value = null
    fileError.value = ''
  }

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
