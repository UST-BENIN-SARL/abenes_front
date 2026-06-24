<template>
  <div class="flex flex-col gap-6">
    <div class="grid gap-2">
      <UiLabel for="product-search">{{ $t('pages.products.filters.search_label') }}</UiLabel>
      <div class="relative">
        <Search class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-(--text-secondary)" />
        <UiInput
          id="product-search"
          :model-value="modelValue.search"
          class="h-10 pl-9"
          :placeholder="$t('pages.products.filters.search_placeholder')"
          @update:model-value="update('search', String($event))"
        />
      </div>
    </div>

    <div v-if="categoryOptions.length" class="grid gap-3">
      <p class="text-sm font-semibold text-(--text-title)">{{ $t('pages.products.filters.category_label') }}</p>
      <label
        v-for="option in categoryOptions"
        :key="option.value"
        class="flex items-center gap-2.5 text-sm text-(--text-dark)"
      >
        <UiCheckbox
          :model-value="modelValue.categories.includes(option.value)"
          @update:model-value="toggle('categories', option.value)"
        />
        {{ option.label }}
      </label>
    </div>

    <div v-if="brandOptions.length" class="grid gap-3">
      <p class="text-sm font-semibold text-(--text-title)">{{ $t('pages.products.filters.brand_label') }}</p>
      <label
        v-for="option in brandOptions"
        :key="option.value"
        class="flex items-center gap-2.5 text-sm text-(--text-dark)"
      >
        <UiCheckbox
          :model-value="modelValue.brands.includes(option.value)"
          @update:model-value="toggle('brands', option.value)"
        />
        {{ option.label }}
      </label>
    </div>

    <div v-if="availabilityOptions.length" class="grid gap-3">
      <p class="text-sm font-semibold text-(--text-title)">{{ $t('pages.products.filters.availability_label') }}</p>
      <label
        v-for="option in availabilityOptions"
        :key="option.value"
        class="flex items-center gap-2.5 text-sm text-(--text-dark)"
      >
        <UiCheckbox
          :model-value="(modelValue.availabilities as string[]).includes(option.value)"
          @update:model-value="toggle('availabilities', option.value)"
        />
        {{ option.label }}
      </label>
    </div>

    <UiButton v-if="hasActiveFilters" type="button" variant="ghost" size="sm" class="w-fit" @click="reset">
      <X class="size-3.5" />
      {{ $t('pages.products.filters.reset') }}
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { Search, X } from '@lucide/vue'
import type { ProductFiltersState } from '~/types/product'

interface FilterOption {
  value: string
  label: string
}

const props = defineProps<{
  modelValue: ProductFiltersState
  categoryOptions: FilterOption[]
  brandOptions: FilterOption[]
  availabilityOptions: FilterOption[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: ProductFiltersState): void
}>()

const hasActiveFilters = computed(
  () =>
    Boolean(props.modelValue.search) ||
    props.modelValue.categories.length > 0 ||
    props.modelValue.brands.length > 0 ||
    props.modelValue.availabilities.length > 0
)

const update = (key: 'search', value: string) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

const toggle = (key: 'categories' | 'brands' | 'availabilities', value: string) => {
  const current = props.modelValue[key] as string[]
  const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
  emit('update:modelValue', { ...props.modelValue, [key]: next } as ProductFiltersState)
}

const reset = () => {
  emit('update:modelValue', { search: '', categories: [], brands: [], availabilities: [] })
}
</script>
