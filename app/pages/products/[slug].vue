<template>
  <div class="container mx-auto px-4 py-10 sm:py-14">
    <SeoManager :title="product?.name ?? $t('pages.products.detail.not_found_title')" :description="product?.shortDescription" />

    <template v-if="product">
      <div class="grid gap-10 lg:grid-cols-2">
        <ProductGallery :images="product.images" :product-name="product.name" />

        <div class="flex flex-col gap-5">
          <div>
            <p class="text-sm font-semibold tracking-wide text-(--text-secondary) uppercase">{{ product.brand }}</p>
            <h1 class="mt-1 text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">{{ product.name }}</h1>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <UiBadge variant="secondary">
              {{ $t(`pages.contact.form.product_categories.${product.category}`) }}
            </UiBadge>
            <span class="flex items-center gap-1.5 text-sm font-medium" :class="tone?.text">
              <span class="size-1.5 rounded-full" :class="tone?.dot" />
              {{ $t(`pages.products.availability.${product.availability}`) }}
            </span>
          </div>

          <p class="text-base text-(--text-dark)">{{ product.shortDescription }}</p>

          <ul v-if="product.highlights?.length" class="flex flex-col gap-2">
            <li
              v-for="highlight in product.highlights"
              :key="highlight"
              class="flex items-start gap-2 text-sm text-(--text-dark)"
            >
              <CheckCircle2 class="mt-0.5 size-4 shrink-0 text-(--primary)" />
              {{ highlight }}
            </li>
          </ul>

          <span
            class="inline-flex w-fit items-center gap-2 rounded-full bg-(--accent-gray-light) px-3 py-1.5 text-xs font-semibold text-(--primary-dark)"
          >
            <Info class="size-3.5" />
            {{ $t('pages.products.detail.quote_notice') }}
          </span>

          <div class="flex flex-col gap-3 sm:flex-row">
            <UiButton as-child size="lg" class="flex-1">
              <NuxtLink :to="buildProductQuoteLink(product)">{{ $t('pages.products.detail.cta_quote') }}</NuxtLink>
            </UiButton>
            <UiButton v-if="product.datasheetUrl" as-child variant="outline" size="lg" class="flex-1 text-(--black)">
              <a :href="product.datasheetUrl" target="_blank" rel="noopener noreferrer">
                <Download class="size-4" />
                {{ $t('pages.products.detail.datasheet_cta') }}
              </a>
            </UiButton>
          </div>
        </div>
      </div>

      <div class="mt-12 grid gap-10 lg:grid-cols-2">
        <section>
          <h2 class="text-lg font-bold text-(--primary-dark)">{{ $t('pages.products.detail.description_title') }}</h2>
          <p class="mt-3 text-sm leading-relaxed text-(--text-dark)">{{ product.description }}</p>
        </section>

        <section v-if="product.specs?.length">
          <h2 class="text-lg font-bold text-(--primary-dark)">{{ $t('pages.products.detail.specs_title') }}</h2>
          <div class="mt-3">
            <ProductSpecsTable :specs="product.specs" />
          </div>
        </section>
      </div>

      <section v-if="relatedProducts.length" class="mt-14">
        <h2 class="text-lg font-bold text-(--primary-dark)">{{ $t('pages.products.detail.related_title') }}</h2>
        <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <ProductCard v-for="related in relatedProducts" :key="related.slug" :product="related" />
        </div>
      </section>
    </template>

    <div v-else class="flex flex-col items-center gap-4 py-20 text-center">
      <PackageX class="size-10 text-(--text-secondary)" />
      <h1 class="text-2xl font-extrabold text-(--primary-dark)">{{ $t('pages.products.detail.not_found_title') }}</h1>
      <p class="max-w-md text-sm text-(--text-secondary)">{{ $t('pages.products.detail.not_found_description') }}</p>
      <UiButton as-child>
        <NuxtLink to="/products">{{ $t('pages.products.detail.back_to_catalog') }}</NuxtLink>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CheckCircle2, Download, Info, PackageX } from '@lucide/vue'

definePageMeta({
  pageBanner: {
    parentKey: 'pages.products.seo_title',
    parentTo: '/products'
  }
})

const route = useRoute()
const { getProductBySlug, getRelatedProducts } = useProducts()

const slug = String(route.params.slug ?? '')
const product = getProductBySlug(slug)

if (!product && import.meta.server) {
  const event = useRequestEvent()
  if (event) setResponseStatus(event, 404)
}

watchEffect(() => {
  if (product && route.meta.pageBanner) route.meta.pageBanner.title = product.name
})

const relatedProducts = product ? getRelatedProducts(product, 3) : []
const tone = product ? productAvailabilityTone(product.availability) : null
</script>
