<template>
  <UiCard class="p-6 sm:p-8">
    <UiCardHeader class="px-0">
      <UiCardTitle class="text-xl font-bold text-(--primary-dark)">
        {{ $t('pages.jobs.apply_form.heading') }}
      </UiCardTitle>
    </UiCardHeader>

    <UiCardContent class="px-0">
      <form class="grid gap-5" novalidate @submit.prevent="onSubmit">
        <div class="grid gap-5 sm:grid-cols-2">
          <div class="grid gap-2">
            <UiLabel for="apply-first-name">
              {{ $t('pages.jobs.apply_form.first_name') }}
              <span class="text-(--danger)">*</span>
            </UiLabel>
            <UiInput
              id="apply-first-name"
              v-model="form.firstName"
              class="h-11 text-base"
              :aria-invalid="hasError('firstName')"
              :placeholder="$t('pages.jobs.apply_form.first_name_placeholder')"
            />
            <p v-if="errors.firstName" class="text-xs text-(--danger)">{{ errors.firstName }}</p>
          </div>

          <div class="grid gap-2">
            <UiLabel for="apply-last-name">
              {{ $t('pages.jobs.apply_form.last_name') }}
              <span class="text-(--danger)">*</span>
            </UiLabel>
            <UiInput
              id="apply-last-name"
              v-model="form.lastName"
              class="h-11 text-base"
              :aria-invalid="hasError('lastName')"
              :placeholder="$t('pages.jobs.apply_form.last_name_placeholder')"
            />
            <p v-if="errors.lastName" class="text-xs text-(--danger)">{{ errors.lastName }}</p>
          </div>
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
          <div class="grid gap-2">
            <UiLabel for="apply-email">
              {{ $t('pages.jobs.apply_form.email') }}
              <span class="text-(--danger)">*</span>
            </UiLabel>
            <UiInput
              id="apply-email"
              v-model="form.email"
              type="email"
              class="h-11 text-base"
              :aria-invalid="hasError('email')"
              :placeholder="$t('pages.jobs.apply_form.email_placeholder')"
            />
            <p v-if="errors.email" class="text-xs text-(--danger)">{{ errors.email }}</p>
          </div>

          <div class="grid gap-2">
            <UiLabel for="apply-phone">{{ $t('pages.jobs.apply_form.phone') }}</UiLabel>
            <ClientOnly>
              <VueTelInput
                id="apply-phone"
                v-model="form.phone"
                mode="international"
                default-country="BJ"
                :auto-default-country="false"
                :input-options="{ placeholder: $t('pages.jobs.apply_form.phone_placeholder') }"
                class="job-apply-tel-input"
              />
              <template #fallback>
                <div class="h-11 rounded-lg border border-(--border) bg-(--background-gray)" />
              </template>
            </ClientOnly>
          </div>
        </div>

        <div class="grid gap-2">
          <UiLabel>
            {{ $t('pages.jobs.apply_form.cv_label') }}
            <span class="text-(--danger)">*</span>
          </UiLabel>
          <div
            ref="dropzoneRef"
            class="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors"
            :class="isOverDropZone ? 'border-(--primary) bg-(--accent-gray-light)' : 'border-(--border) hover:border-(--primary)'"
            @click="openFilePicker"
          >
            <UploadCloud class="size-5 text-(--primary)" />
            <p class="text-sm text-(--text-secondary)">
              <span v-if="hasCv" class="font-medium text-(--text-title)">{{ cvFileName }}</span>
              <span v-else>{{ $t('pages.jobs.apply_form.cv_cta') }}</span>
            </p>
            <UiButton v-if="hasCv" type="button" variant="ghost" size="sm" @click.stop="clearCv">
              {{ $t('pages.jobs.apply_form.cv_remove') }}
            </UiButton>
          </div>
          <input
            ref="cvInputRef"
            type="file"
            class="hidden"
            accept=".pdf,.doc,.docx"
            @change="handleCvSelect"
          >
          <p v-if="cvError || cvSubmitError" class="text-xs text-(--danger)">{{ cvError || cvSubmitError }}</p>
        </div>

        <div class="grid gap-2">
          <UiLabel for="apply-message">{{ $t('pages.jobs.apply_form.message_label') }}</UiLabel>
          <UiTextarea
            id="apply-message"
            v-model="form.message"
            rows="4"
            class="min-h-[5.5rem] text-base"
            :placeholder="$t('pages.jobs.apply_form.message_placeholder')"
          />
        </div>

        <UiButton type="submit" size="lg" class="w-full sm:w-fit" :disabled="isSubmitting">
          <Send class="size-4" />
          {{ isSubmitting ? $t('pages.jobs.apply_form.submitting') : $t('pages.jobs.apply_form.submit') }}
        </UiButton>
      </form>
    </UiCardContent>
  </UiCard>
</template>

<script setup lang="ts">
import { Send, UploadCloud } from '@lucide/vue'
import { VueTelInput } from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'
import { createJobApplicationSchema } from '#shared/utils/jobApplicationSchema'
import type { Job } from '~/types/job'

const props = defineProps<{
  job: Job
}>()

const { t } = useI18n()

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: ''
})

const schema = createJobApplicationSchema({
  required: t('validation.required'),
  email: t('validation.email')
})

const { errors, validateForm, clearAllErrors, hasError } = useFormValidation(schema)

const {
  file: cvFile,
  fileName: cvFileName,
  hasFile: hasCv,
  fileError: cvError,
  handleFileSelect: handleCvSelect,
  clearFile: clearCv,
  validateFile: validateCvFile,
  triggerFileInput: triggerCvInput
} = useFileUpload({
  acceptedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
})

const cvInputRef = ref<HTMLInputElement | null>(null)
const openFilePicker = () => triggerCvInput(cvInputRef)

const dropzoneRef = ref<HTMLElement | null>(null)
const { isOverDropZone } = useDropZone(dropzoneRef, {
  onDrop: (files) => {
    const dropped = files?.[0]
    if (!dropped) return

    const error = validateCvFile(dropped)
    if (error) {
      cvError.value = error
      return
    }

    cvFile.value = dropped
    cvError.value = ''
  }
})

const cvSubmitError = ref('')
const isSubmitting = ref(false)

const resetForm = () => {
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
  form.message = ''
  clearCv()
}

const onSubmit = async () => {
  clearAllErrors()
  cvSubmitError.value = ''

  const payload = {
    ...form,
    jobSlug: props.job.slug,
    jobTitle: props.job.title
  }

  const isFormValid = validateForm(payload)

  if (!hasCv.value) {
    cvSubmitError.value = t('pages.jobs.apply_form.cv_required')
  }

  if (!isFormValid || !hasCv.value) return

  isSubmitting.value = true

  try {
    const body = new FormData()
    Object.entries(payload).forEach(([key, value]) => body.append(key, String(value)))
    if (cvFile.value) body.append('cv', cvFile.value)

    await $fetch('/api/jobs/apply', { method: 'POST', body })
    useCustomToast(t('pages.jobs.apply_form.success'), 'success').temporary()
    resetForm()
  } catch {
    useCustomToast(t('pages.jobs.apply_form.error'), 'error').temporary()
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.job-apply-tel-input {
  min-height: 2.75rem;
  align-items: stretch;
  border-radius: var(--radius-lg, 0.5rem);
  border-color: var(--border);
  background: transparent;
}

.job-apply-tel-input :deep(.vti__dropdown) {
  padding: 0 0.625rem;
}

.job-apply-tel-input :deep(.vti__input) {
  padding-left: 0.625rem;
  font-size: 1rem;
  font-weight: 500;
}
</style>
