<template>
  <div class="relative flex items-center justify-center overflow-hidden bg-(--background-gray)" :class="props.class">
    <NuxtImg v-if="src" :src="src" :alt="alt" width="800" class="size-full object-cover" />
    <div v-else class="flex size-full flex-col items-center justify-center gap-2 bg-(--primary-dark) p-4">
      <Newspaper class="size-9 text-white/80" />
      <p class="text-center text-xs font-medium text-white/90">{{ alt }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Newspaper } from '@lucide/vue'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  src?: string
  alt: string
  class?: HTMLAttributes['class']
}>()
</script>
