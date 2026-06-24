<template>
  <div
    class="relative flex items-center justify-center overflow-hidden bg-(--background-gray)"
    :class="props.class"
    @mousemove="onMouseMove"
    @mouseenter="isZooming = true"
    @mouseleave="isZooming = false"
  >
    <template v-if="src">
      <NuxtImg :src="src" :alt="alt" width="800" class="size-full object-contain" />
      <div
        v-if="zoom && isZooming"
        class="pointer-events-none absolute inset-0 hidden sm:block"
        :style="{
          backgroundImage: `url(${zoomSrc})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '220%',
          backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`
        }"
      />
    </template>
    <div v-else class="flex size-full flex-col items-center justify-center gap-2 bg-(--primary) p-4">
      <PackageSearch class="size-10 text-white/80" />
      <p class="text-center text-xs font-medium text-white/90">{{ alt }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PackageSearch } from '@lucide/vue'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  src?: string
  alt: string
  zoom?: boolean
  class?: HTMLAttributes['class']
}>()

const isZooming = ref(false)
const zoomPosition = ref({ x: 50, y: 50 })

const img = useImage()
const zoomSrc = computed(() => (props.src ? img(props.src, { width: 1200 }) : ''))

const onMouseMove = (event: MouseEvent) => {
  if (!props.zoom || !props.src) return
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  zoomPosition.value = {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100
  }
}
</script>
