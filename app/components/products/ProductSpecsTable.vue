<template>
  <dl class="overflow-hidden rounded-xl border border-(--border)">
    <div
      v-for="(spec, index) in specs"
      :key="spec.label"
      class="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
      :class="index % 2 === 1 ? 'bg-(--background-gray)' : 'bg-white'"
    >
      <dt class="text-sm font-medium text-(--text-secondary)">{{ spec.label }}</dt>
      <dd class="text-sm font-semibold text-(--text-title)">{{ spec.value }}</dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
import type { ProductSpec } from '~/types/product'

defineProps<{
  specs: ProductSpec[]
}>()
</script>
