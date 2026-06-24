<template>
  <div class="flex flex-col gap-6">
    <div class="grid gap-2">
      <UiLabel for="job-search">{{ $t('pages.jobs.filters.search_label') }}</UiLabel>
      <div class="relative">
        <Search class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-(--text-secondary)" />
        <UiInput
          id="job-search"
          :model-value="modelValue.search"
          class="h-10 pl-9"
          :placeholder="$t('pages.jobs.filters.search_placeholder')"
          @update:model-value="update('search', String($event))"
        />
      </div>
    </div>

    <div v-if="departmentOptions.length" class="grid gap-3">
      <p class="text-sm font-semibold text-(--text-title)">{{ $t('pages.jobs.filters.department_label') }}</p>
      <label
        v-for="option in departmentOptions"
        :key="option.value"
        class="flex items-center gap-2.5 text-sm text-(--text-dark)"
      >
        <UiCheckbox
          :model-value="(modelValue.departments as string[]).includes(option.value)"
          @update:model-value="toggle('departments', option.value)"
        />
        {{ option.label }}
      </label>
    </div>

    <div v-if="contractTypeOptions.length" class="grid gap-3">
      <p class="text-sm font-semibold text-(--text-title)">{{ $t('pages.jobs.filters.contract_type_label') }}</p>
      <label
        v-for="option in contractTypeOptions"
        :key="option.value"
        class="flex items-center gap-2.5 text-sm text-(--text-dark)"
      >
        <UiCheckbox
          :model-value="(modelValue.contractTypes as string[]).includes(option.value)"
          @update:model-value="toggle('contractTypes', option.value)"
        />
        {{ option.label }}
      </label>
    </div>

    <div v-if="locationOptions.length" class="grid gap-3">
      <p class="text-sm font-semibold text-(--text-title)">{{ $t('pages.jobs.filters.location_label') }}</p>
      <label
        v-for="option in locationOptions"
        :key="option.value"
        class="flex items-center gap-2.5 text-sm text-(--text-dark)"
      >
        <UiCheckbox
          :model-value="modelValue.locations.includes(option.value)"
          @update:model-value="toggle('locations', option.value)"
        />
        {{ option.label }}
      </label>
    </div>

    <UiButton v-if="hasActiveFilters" type="button" variant="ghost" size="sm" class="w-fit" @click="reset">
      <X class="size-3.5" />
      {{ $t('pages.jobs.filters.reset') }}
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { Search, X } from '@lucide/vue'
import type { JobFiltersState } from '~/types/job'

interface FilterOption {
  value: string
  label: string
}

const props = defineProps<{
  modelValue: JobFiltersState
  departmentOptions: FilterOption[]
  contractTypeOptions: FilterOption[]
  locationOptions: FilterOption[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: JobFiltersState): void
}>()

const hasActiveFilters = computed(
  () =>
    Boolean(props.modelValue.search) ||
    props.modelValue.departments.length > 0 ||
    props.modelValue.contractTypes.length > 0 ||
    props.modelValue.locations.length > 0
)

const update = (key: 'search', value: string) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

const toggle = (key: 'departments' | 'contractTypes' | 'locations', value: string) => {
  const current = props.modelValue[key] as string[]
  const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
  emit('update:modelValue', { ...props.modelValue, [key]: next } as JobFiltersState)
}

const reset = () => {
  emit('update:modelValue', { search: '', departments: [], contractTypes: [], locations: [] })
}
</script>
