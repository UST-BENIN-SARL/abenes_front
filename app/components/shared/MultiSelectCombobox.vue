<template>
  <UiPopover v-model:open="open">
    <UiPopoverTrigger as-child>
      <button
        :id="id"
        type="button"
        role="combobox"
        :aria-expanded="open"
        class="flex min-h-11 w-full flex-wrap items-center gap-1.5 rounded-lg border border-(--border) bg-transparent px-2.5 py-1.5 text-left text-sm transition-colors focus-visible:border-(--primary) focus-visible:ring-3 focus-visible:ring-(--primary)/30"
      >
        <template v-if="selected.length">
          <UiBadge
            v-for="item in selected"
            :key="item.value"
            variant="secondary"
            class="gap-1 pr-1"
          >
            {{ item.label }}
            <button
              type="button"
              class="rounded-full p-0.5 text-(--text-secondary) hover:text-(--danger)"
              @click.stop="toggle(item.value)"
            >
              <X class="size-3" />
            </button>
          </UiBadge>
        </template>
        <span v-else class="text-(--text-secondary)">{{ placeholder }}</span>
        <ChevronDown class="ml-auto size-4 shrink-0 text-(--text-secondary)" />
      </button>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-(--reka-popover-trigger-width) bg-white p-0" align="start">
      <UiCommand>
        <UiCommandInput :placeholder="searchPlaceholder" />
        <UiCommandList class="bg-white">
          <UiCommandEmpty>{{ emptyText }}</UiCommandEmpty>
          <UiCommandGroup>
            <UiCommandItem
              v-for="option in options"
              :key="option.value"
              :value="option.value"
              @select.prevent="toggle(option.value)"
            >
              <Check :class="['size-4', modelValue.includes(option.value) ? 'opacity-100' : 'opacity-0']" />
              {{ option.label }}
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </UiCommand>
    </UiPopoverContent>
  </UiPopover>
</template>

<script setup lang="ts">
import { Check, ChevronDown, X } from '@lucide/vue'

interface ComboboxOption {
  value: string
  label: string
}

const props = defineProps<{
  id?: string
  modelValue: string[]
  options: ComboboxOption[]
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const open = ref(false)

const selected = computed(() => props.options.filter((option) => props.modelValue.includes(option.value)))

const toggle = (value: string) => {
  const next = props.modelValue.includes(value)
    ? props.modelValue.filter((v) => v !== value)
    : [...props.modelValue, value]
  emit('update:modelValue', next)
}
</script>
