<template>
  <div class="flex flex-col gap-3">
    <ProductImage :src="activeImage" :alt="productName" zoom class="aspect-square w-full rounded-xl" />

    <div v-if="images.length > 1" class="flex gap-2 overflow-x-auto pb-1">
      <button
        v-for="(image, index) in images"
        :key="image"
        type="button"
        class="size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors"
        :class="index === activeImageIndex ? 'border-(--primary)' : 'border-(--border) hover:border-(--primary)/60'"
        @click="activeImageIndex = index"
      >
        <ProductImage :src="image" :alt="productName" class="size-full" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  images: string[]
  productName: string
}>()

const activeImageIndex = ref(0)
const activeImage = computed(() => props.images[activeImageIndex.value])
</script>
