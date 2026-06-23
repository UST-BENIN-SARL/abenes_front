<template>
  <div>
    <SeoManager :title="$t('pages.contact.seo_title')" />

    <div class="container mx-auto px-4 py-10 sm:py-14">
      <span
        class="inline-flex items-center gap-2 rounded-full bg-(--accent-gray-light) px-3 py-1.5 text-xs font-semibold text-(--primary-dark)"
      >
        <Clock class="size-3.5" />
        {{ $t("pages.contact.response_badge") }}
      </span>

      <div class="mt-6 grid gap-6 lg:grid-cols-3">
        <UiCard class="p-6 sm:p-8 lg:col-span-2">
          <UiCardHeader class="px-0">
            <UiCardTitle class="text-xl font-bold text-(--primary-dark)">
              {{ $t("pages.contact.form.heading") }}
            </UiCardTitle>
          </UiCardHeader>

          <UiCardContent class="px-0">
            <form class="grid gap-5" novalidate @submit.prevent="onSubmit">
              <div class="grid gap-5 sm:grid-cols-2">
                <div class="grid gap-2">
                  <UiLabel for="contact-first-name">
                    {{ $t("pages.contact.form.first_name") }}
                    <span class="text-(--danger)">*</span>
                  </UiLabel>
                  <UiInput
                    id="contact-first-name"
                    v-model="form.firstName"
                    class="h-11 text-base md:text-base"
                    :aria-invalid="hasError('firstName')"
                    :placeholder="$t('pages.contact.form.first_name_placeholder')"
                  />
                  <p v-if="errors.firstName" class="text-xs text-(--danger)">
                    {{ errors.firstName }}
                  </p>
                </div>

                <div class="grid gap-2">
                  <UiLabel for="contact-last-name">
                    {{ $t("pages.contact.form.last_name") }}
                    <span class="text-(--danger)">*</span>
                  </UiLabel>
                  <UiInput
                    id="contact-last-name"
                    v-model="form.lastName"
                    class="h-11 text-base md:text-base"
                    :aria-invalid="hasError('lastName')"
                    :placeholder="$t('pages.contact.form.last_name_placeholder')"
                  />
                  <p v-if="errors.lastName" class="text-xs text-(--danger)">
                    {{ errors.lastName }}
                  </p>
                </div>
              </div>

              <div class="grid gap-2">
                <UiLabel for="contact-organization">
                  {{ $t("pages.contact.form.organization") }}
                </UiLabel>
                <UiInput
                  id="contact-organization"
                  v-model="form.organization"
                  class="h-11 text-base md:text-base"
                  :placeholder="$t('pages.contact.form.organization_placeholder')"
                />
              </div>

              <div class="grid gap-5 sm:grid-cols-2">
                <div class="grid gap-2">
                  <UiLabel for="contact-email">
                    {{ $t("pages.contact.form.email") }}
                    <span class="text-(--danger)">*</span>
                  </UiLabel>
                  <UiInput
                    id="contact-email"
                    v-model="form.email"
                    type="email"
                    class="h-11 text-base md:text-base"
                    :aria-invalid="hasError('email')"
                    :placeholder="$t('pages.contact.form.email_placeholder')"
                  />
                  <p v-if="errors.email" class="text-xs text-(--danger)">
                    {{ errors.email }}
                  </p>
                </div>

                <div class="grid gap-2">
                  <UiLabel for="contact-phone">{{
                    $t("pages.contact.form.phone")
                  }}</UiLabel>
                  <ClientOnly>
                    <VueTelInput
                      id="contact-phone"
                      v-model="form.phone"
                      mode="international"
                      default-country="BJ"
                      :auto-default-country="false"
                      class="contact-tel-input"
                    />
                    <template #fallback>
                      <div
                        class="h-11 rounded-lg border border-(--border) bg-(--background-gray)"
                      />
                    </template>
                  </ClientOnly>
                </div>
              </div>

              <div class="grid gap-2">
                <UiLabel for="contact-subject">
                  {{ $t("pages.contact.form.subject") }}
                  <span class="text-(--danger)">*</span>
                </UiLabel>
                <UiSelect v-model="form.subject">
                  <UiSelectTrigger
                    id="contact-subject"
                    class="w-full text-base data-[size=default]:h-11"
                    :aria-invalid="hasError('subject')"
                  >
                    <UiSelectValue
                      :placeholder="$t('pages.contact.form.subject_placeholder')"
                    />
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem
                      v-for="subject in subjectOptions"
                      :key="subject.value"
                      :value="subject.value"
                    >
                      {{ subject.label }}
                    </UiSelectItem>
                  </UiSelectContent>
                </UiSelect>
                <p v-if="errors.subject" class="text-xs text-(--danger)">
                  {{ errors.subject }}
                </p>
              </div>

              <div class="grid gap-2">
                <UiLabel for="contact-product-category">
                  {{ $t("pages.contact.form.product_category") }}
                </UiLabel>
                <UiSelect v-model="form.productCategory">
                  <UiSelectTrigger
                    id="contact-product-category"
                    class="w-full text-base data-[size=default]:h-11"
                  >
                    <UiSelectValue
                      :placeholder="$t('pages.contact.form.product_category_placeholder')"
                    />
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem
                      v-for="category in productCategoryOptions"
                      :key="category.value"
                      :value="category.value"
                    >
                      {{ category.label }}
                    </UiSelectItem>
                  </UiSelectContent>
                </UiSelect>
              </div>

              <div class="grid gap-2">
                <UiLabel for="contact-message">
                  {{ $t("pages.contact.form.message") }}
                  <span class="text-(--danger)">*</span>
                </UiLabel>
                <UiTextarea
                  id="contact-message"
                  v-model="form.message"
                  rows="8"
                  class="min-h-44 text-base md:text-base"
                  :aria-invalid="hasError('message')"
                  :placeholder="$t('pages.contact.form.message_placeholder')"
                />
                <p v-if="errors.message" class="text-xs text-(--danger)">
                  {{ errors.message }}
                </p>
              </div>

              <div class="grid gap-2">
                <UiLabel>{{ $t("pages.contact.form.attachment") }}</UiLabel>
                <div
                  ref="dropzoneRef"
                  class="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-6 text-center transition-colors"
                  :class="isOverDropZone ? 'border-(--primary) bg-(--accent-gray-light)' : 'border-(--border) hover:border-(--primary)'"
                  @click="openFilePicker"
                >
                  <UploadCloud class="size-5 text-(--primary)" />
                  <p class="text-sm text-(--text-secondary)">
                    <span v-if="hasFile" class="font-medium text-(--text-title)">{{ fileName }}</span>
                    <span v-else>{{ $t("pages.contact.form.attachment_cta") }}</span>
                  </p>
                  <UiButton
                    v-if="hasFile"
                    type="button"
                    variant="ghost"
                    size="sm"
                    @click.stop="clearFile"
                  >
                    {{ $t("pages.contact.form.attachment_remove") }}
                  </UiButton>
                </div>
                <input
                  ref="fileInputRef"
                  type="file"
                  class="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  @change="handleFileSelect"
                >
                <p v-if="fileError" class="text-xs text-(--danger)">{{ fileError }}</p>
              </div>

              <UiButton
                type="submit"
                size="lg"
                class="w-full sm:w-fit"
                :disabled="isSubmitting"
              >
                {{
                  isSubmitting
                    ? $t("pages.contact.form.submitting")
                    : $t("pages.contact.form.submit")
                }}
              </UiButton>
            </form>
          </UiCardContent>
        </UiCard>

        <div class="flex flex-col gap-6">
          <div class="rounded-xl border border-(--border) p-5">
            <p class="flex items-center gap-2 font-bold text-(--primary-dark)">
              <MapPin class="size-4 text-(--primary)" />
              {{ $t("pages.contact.info.heading") }}
            </p>
            <div class="mt-4 flex flex-col gap-3 text-sm">
              <div>
                <p class="font-semibold text-(--text-title)">{{ $t("pages.contact.info.address_label") }}</p>
                <p class="text-(--text-secondary)">{{ $t("pages.contact.info.address") }}</p>
              </div>
              <div>
                <p class="font-semibold text-(--text-title)">{{ $t("pages.contact.info.phone_label") }}</p>
                <a :href="`tel:${PHONE_NUMBER}`" class="text-(--text-secondary) transition-colors hover:text-(--primary)">
                  {{ PHONE_DISPLAY }}
                </a>
              </div>
              <div>
                <p class="font-semibold text-(--text-title)">{{ $t("pages.contact.info.email_label") }}</p>
                <a :href="`mailto:${EMAIL}`" class="text-(--text-secondary) transition-colors hover:text-(--primary)">
                  {{ EMAIL }}
                </a>
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-(--success)/40 p-5">
            <p class="font-bold text-(--success)">
              {{ $t("pages.contact.info.whatsapp_cta") }}
            </p>
            <p class="mt-1 text-xs text-(--text-secondary)">
              {{ $t("pages.contact.info.whatsapp_hours") }}
            </p>
            <a
              :href="whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-3 inline-flex items-center gap-2 rounded-full bg-(--success) px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-(--success-variant)"
            >
              <MessageCircle class="size-4" />
              {{ PHONE_DISPLAY }}
            </a>
          </div>

          <div class="rounded-xl border border-(--border) p-5">
            <p class="flex items-center gap-2 font-bold text-(--primary-dark)">
              <Clock class="size-4 text-(--primary)" />
              {{ $t("pages.contact.info.hours_heading") }}
            </p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p class="text-(--text-secondary)">{{ $t("pages.contact.info.hours_weekdays_label") }}</p>
                <p class="font-semibold text-(--text-title)">{{ $t("pages.contact.info.hours_weekdays_value") }}</p>
              </div>
              <div>
                <p class="text-(--text-secondary)">{{ $t("pages.contact.info.hours_saturday_label") }}</p>
                <p class="font-semibold text-(--text-title)">{{ $t("pages.contact.info.hours_saturday_value") }}</p>
              </div>
              <div>
                <p class="text-(--text-secondary)">{{ $t("pages.contact.info.hours_sunday_label") }}</p>
                <p class="font-semibold text-(--text-title)">{{ $t("pages.contact.info.hours_sunday_value") }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-(--border) p-5">
            <p class="font-bold text-(--primary-dark)">
              {{ $t("pages.contact.info.social_heading") }}
            </p>
            <p class="mt-2 text-sm text-(--text-secondary)">
              {{ $t("pages.contact.info.social_text") }}
            </p>
            <div class="mt-3 flex gap-3">
              <a
                v-for="social in socials"
                :key="social.name"
                :href="social.href"
                :aria-label="social.name"
                target="_blank"
                rel="noopener noreferrer"
                class="flex size-9 items-center justify-center rounded-full bg-(--primary) text-white transition-colors hover:bg-(--primary-dark)"
                v-html="social.icon"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 h-64 w-full overflow-hidden rounded-xl">
        <ClientOnly>
          <LMap
            ref="mapRef"
            :zoom="13"
            :center="MAP_CENTER"
            :use-global-leaflet="false"
            class="h-full w-full"
            @ready="onMapReady"
          >
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
            <LMarker :lat-lng="MAP_CENTER" />
          </LMap>
          <template #fallback>
            <div class="h-full w-full bg-(--background-gray)" />
          </template>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Clock, MapPin, MessageCircle, UploadCloud } from "@lucide/vue";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";
import type L from "leaflet";
import { CONTACT_SUBJECTS, PRODUCT_CATEGORIES, createContactSchema } from "#shared/utils/contactSchema";

definePageMeta({
  pageBanner: {
    titleKey: "pages.contact.title",
    subtitleKey: "pages.contact.subtitle",
    breadcrumbKey: "pages.contact.seo_title",
  },
});

const PHONE_DISPLAY = "+229 97 12 14 97";
const PHONE_NUMBER = "+22997121497";
const EMAIL = "contact@abenes.bj";
const MAP_CENTER: [number, number] = [6.3928634, 2.4006742];

const { t } = useI18n();

const mapRef = ref<{ leafletObject?: L.Map } | null>(null);
const onMapReady = () => {
  nextTick(() => {
    mapRef.value?.leafletObject?.invalidateSize();
  });
};

const whatsappLink = computed(() => `https://wa.me/${PHONE_NUMBER.replace("+", "")}`);
const socials = SOCIAL_LINKS;

const subjectOptions = computed(() =>
  CONTACT_SUBJECTS.map((value) => ({
    value,
    label: t(`pages.contact.form.subjects.${value}`),
  }))
);

const productCategoryOptions = computed(() =>
  PRODUCT_CATEGORIES.map((value) => ({
    value,
    label: t(`pages.contact.form.product_categories.${value}`),
  }))
);

const form = reactive({
  firstName: "",
  lastName: "",
  organization: "",
  email: "",
  phone: "",
  subject: "",
  productCategory: "",
  message: "",
});

const schema = createContactSchema({
  required: t("validation.required"),
  email: t("validation.email"),
});

const { errors, validateForm, clearAllErrors, hasError } = useFormValidation(schema);

const { file, fileName, hasFile, fileError, handleFileSelect, clearFile, validateFile, triggerFileInput } =
  useFileUpload();
const fileInputRef = ref<HTMLInputElement | null>(null);
const openFilePicker = () => triggerFileInput(fileInputRef);

const dropzoneRef = ref<HTMLElement | null>(null);
const { isOverDropZone } = useDropZone(dropzoneRef, {
  onDrop: (files) => {
    const dropped = files?.[0];
    if (!dropped) return;

    const error = validateFile(dropped);
    if (error) {
      fileError.value = error;
      return;
    }

    file.value = dropped;
    fileError.value = "";
  },
});

const isSubmitting = ref(false);

const resetForm = () => {
  form.firstName = "";
  form.lastName = "";
  form.organization = "";
  form.email = "";
  form.phone = "";
  form.subject = "";
  form.productCategory = "";
  form.message = "";
  clearFile();
};

const onSubmit = async () => {
  clearAllErrors();

  if (!validateForm(form)) return;

  isSubmitting.value = true;

  try {
    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, String(value)));
    if (file.value) body.append("attachment", file.value);

    await $fetch("/api/contact", { method: "POST", body });
    useCustomToast(t("pages.contact.form.success"), "success").temporary();
    resetForm();
  } catch {
    useCustomToast(t("pages.contact.form.error"), "error").temporary();
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-tel-input {
  min-height: 2.75rem;
  align-items: stretch;
  border-radius: var(--radius-lg, 0.5rem);
  border-color: var(--border);
  background: transparent;
}

.contact-tel-input :deep(.vti__dropdown) {
  padding: 0 0.625rem;
}

.contact-tel-input :deep(.vti__input) {
  padding-left: 0.625rem;
  font-size: 1rem;
  font-weight: 500;
}
</style>
