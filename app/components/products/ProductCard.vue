<template>
  <div class="group flex flex-col overflow-hidden rounded-xl border border-(--border) bg-white transition-shadow hover:shadow-lg">
    <NuxtLink :to="`/products/${product.slug}`" class="block">
      <ProductImage :src="product.images[0]" :alt="product.name" class="aspect-[4/3] w-full" />
    </NuxtLink>

    <div class="flex flex-1 flex-col gap-3 p-4">
      <div class="flex items-center justify-between gap-2">
        <UiBadge variant="secondary">{{ $t(`pages.contact.form.product_categories.${product.category}`) }}</UiBadge>
        <span class="flex items-center gap-1.5 text-xs font-medium" :class="tone.text">
          <span class="size-1.5 rounded-full" :class="tone.dot" />
          {{ $t(`pages.products.availability.${product.availability}`) }}
        </span>
      </div>

      <div>
        <p class="text-xs font-semibold tracking-wide text-(--text-secondary) uppercase">{{ product.brand }}</p>
        <NuxtLink :to="`/products/${product.slug}`" class="font-bold text-(--primary-dark) hover:underline">
          {{ product.name }}
        </NuxtLink>
      </div>

      <p class="line-clamp-2 flex-1 text-sm text-(--text-secondary)">{{ product.shortDescription }}</p>

      <div class="mt-1 flex flex-col gap-2 sm:flex-row">
        <UiButton as-child variant="outline" size="sm" class="flex-1 text-(--black)">
          <NuxtLink :to="`/products/${product.slug}`">{{ $t('pages.products.card.cta_details') }}</NuxtLink>
        </UiButton>
        <UiButton as-child size="sm" class="flex-1">
          <NuxtLink :to="buildProductQuoteLink(product)">{{ $t('pages.products.card.cta_quote') }}</NuxtLink>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
}>()

const tone = computed(() => productAvailabilityTone(props.product.availability))
</script>
