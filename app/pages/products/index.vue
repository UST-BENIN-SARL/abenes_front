<template>
  <div class="container mx-auto px-4 py-10 sm:py-14">
    <SeoManager :title="$t('pages.products.seo_title')" />

    <div class="flex flex-col gap-8 lg:flex-row lg:gap-10">
      <aside class="hidden lg:block lg:w-64 lg:shrink-0">
        <div
          class="rounded-xl border border-(--border) p-5 lg:sticky"
          style="top: calc(var(--fixed-header-height, 0px) + 1.5rem)"
        >
          <ProductFiltersPanel
            v-model="filters"
            :category-options="categoryOptions"
            :brand-options="brandOptions"
            :availability-options="availabilityOptions"
          />
        </div>
      </aside>

      <div class="flex-1">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-(--border) pb-4">
          <div class="flex items-center gap-3">
            <UiButton type="button" variant="outline" size="sm" class="lg:hidden" @click="showMobileFilters = true">
              <SlidersHorizontal class="size-4" />
              {{ $t('pages.products.filters.toggle_cta') }}
              <UiBadge v-if="activeFilterCount" variant="secondary">{{ activeFilterCount }}</UiBadge>
            </UiButton>
            <p class="text-sm text-(--text-secondary)">
              {{ $t('pages.products.results_count', { count: filteredProducts.length }) }}
            </p>
          </div>

          <div class="flex items-center gap-2">
            <UiLabel for="products-sort" class="text-sm text-(--text-secondary)">
              {{ $t('pages.products.sort.label') }}
            </UiLabel>
            <UiSelect v-model="sort">
              <UiSelectTrigger id="products-sort" class="h-9 w-44 text-sm">
                <UiSelectValue>{{ sortLabel }}</UiSelectValue>
              </UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem value="featured">{{ $t('pages.products.sort.featured') }}</UiSelectItem>
                <UiSelectItem value="name_asc">{{ $t('pages.products.sort.name_asc') }}</UiSelectItem>
                <UiSelectItem value="name_desc">{{ $t('pages.products.sort.name_desc') }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
        </div>

        <div v-if="paginatedProducts.length" class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <ProductCard v-for="product in paginatedProducts" :key="product.slug" :product="product" />
        </div>

        <div
          v-else
          class="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-(--border) p-10 text-center"
        >
          <SearchX class="size-8 text-(--text-secondary)" />
          <p class="font-semibold text-(--text-title)">{{ $t('pages.products.empty.title') }}</p>
          <p class="text-sm text-(--text-secondary)">{{ $t('pages.products.empty.description') }}</p>
          <UiButton type="button" variant="outline" @click="resetFilters">
            {{ $t('pages.products.empty.reset_cta') }}
          </UiButton>
        </div>

        <nav v-if="totalPages > 1" class="mt-8 flex items-center justify-center gap-1.5" aria-label="Pagination">
          <UiButton
            type="button"
            variant="outline"
            size="icon-sm"
            class="text-(--black)"
            :disabled="currentPage === 1"
            :aria-label="$t('common.pagination.prev')"
            @click="currentPage--"
          >
            <ChevronLeft class="size-4" />
          </UiButton>

          <UiButton
            v-for="page in totalPages"
            :key="page"
            type="button"
            :variant="page === currentPage ? 'default' : 'outline'"
            :class="page === currentPage ? '' : 'text-(--black)'"
            size="icon-sm"
            @click="currentPage = page"
          >
            {{ page }}
          </UiButton>

          <UiButton
            type="button"
            variant="outline"
            size="icon-sm"
            class="text-(--black)"
            :disabled="currentPage === totalPages"
            :aria-label="$t('common.pagination.next')"
            @click="currentPage++"
          >
            <ChevronRight class="size-4" />
          </UiButton>
        </nav>
      </div>
    </div>

    <UiDialog v-model:open="showMobileFilters">
      <UiDialogContent class="max-h-[85vh] overflow-y-auto">
        <UiDialogHeader>
          <UiDialogTitle>{{ $t('pages.products.filters.title') }}</UiDialogTitle>
        </UiDialogHeader>
        <ProductFiltersPanel
          v-model="filters"
          :category-options="categoryOptions"
          :brand-options="brandOptions"
          :availability-options="availabilityOptions"
        />
        <UiDialogFooter>
          <UiButton type="button" class="w-full" @click="showMobileFilters = false">
            {{ $t('pages.products.filters.show_results') }}
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, SearchX, SlidersHorizontal } from '@lucide/vue'
import type { ProductFiltersState } from '~/types/product'

definePageMeta({
  pageBanner: {
    titleKey: 'pages.products.title',
    subtitleKey: 'pages.products.subtitle',
    breadcrumbKey: 'pages.products.seo_title'
  }
})

const { t } = useI18n()
const { products } = useProducts()

const filters = ref<ProductFiltersState>({
  search: '',
  categories: [],
  brands: [],
  availabilities: []
})

const sort = ref<'featured' | 'name_asc' | 'name_desc'>('featured')
const showMobileFilters = ref(false)

const sortLabel = computed(() => t(`pages.products.sort.${sort.value}`))

const categoryOptions = computed(() => {
  const categories: string[] = []
  for (const product of products) {
    if (!categories.includes(product.category)) categories.push(product.category)
  }
  return categories.map((value) => ({ value, label: t(`pages.contact.form.product_categories.${value}`) }))
})

const brandOptions = computed(() => {
  const brands = [...new Set(products.map((product) => product.brand))].sort()
  return brands.map((value) => ({ value, label: value }))
})

const availabilityOptions = computed(() =>
  (['in_stock', 'on_order', 'quote_only'] as const).map((value) => ({
    value,
    label: t(`pages.products.availability.${value}`)
  }))
)

const activeFilterCount = computed(
  () =>
    filters.value.categories.length +
    filters.value.brands.length +
    filters.value.availabilities.length +
    (filters.value.search ? 1 : 0)
)

const filteredProducts = computed(() => {
  const search = filters.value.search.trim().toLowerCase()

  const list = products.filter((product) => {
    if (filters.value.categories.length && !filters.value.categories.includes(product.category)) return false
    if (filters.value.brands.length && !filters.value.brands.includes(product.brand)) return false
    if (filters.value.availabilities.length && !filters.value.availabilities.includes(product.availability))
      return false
    if (search) {
      const haystack = `${product.name} ${product.brand} ${product.shortDescription}`.toLowerCase()
      if (!haystack.includes(search)) return false
    }
    return true
  })

  return [...list].sort((a, b) => {
    if (sort.value === 'name_asc') return a.name.localeCompare(b.name)
    if (sort.value === 'name_desc') return b.name.localeCompare(a.name)
    if (Boolean(a.featured) === Boolean(b.featured)) return a.name.localeCompare(b.name)
    return a.featured ? -1 : 1
  })
})

const PAGE_SIZE = 9
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredProducts.value.length / PAGE_SIZE)))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredProducts.value.slice(start, start + PAGE_SIZE)
})

watch([filters, sort], () => {
  currentPage.value = 1
}, { deep: true })

const resetFilters = () => {
  filters.value = { search: '', categories: [], brands: [], availabilities: [] }
}
</script>
