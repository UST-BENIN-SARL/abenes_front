<template>
  <div class="container mx-auto px-4 py-10 sm:py-14">
    <SeoManager :title="$t('pages.news.seo_title')" />

    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="relative w-full sm:max-w-xs">
        <Search class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-(--text-secondary)" />
        <UiInput v-model="search" class="h-10 pl-9" :placeholder="$t('pages.news.filters.search_placeholder')" />
      </div>

      <p class="text-sm text-(--text-secondary)">
        {{ $t('pages.news.results_count', { count: filteredArticles.length }) }}
      </p>
    </div>

    <div class="mt-5 flex flex-wrap gap-2">
      <button
        v-for="option in categoryOptions"
        :key="option.value"
        type="button"
        class="rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors"
        :class="
          activeCategory === option.value
            ? 'border-(--primary) bg-(--primary) text-white'
            : 'border-(--border) text-(--text-dark) hover:border-(--primary) hover:text-(--primary)'
        "
        @click="activeCategory = option.value"
      >
        {{ option.label }}
      </button>
    </div>

    <div v-if="paginatedArticles.length" class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      <NewsCard v-for="article in paginatedArticles" :key="article.slug" :article="article" />
    </div>

    <div
      v-else
      class="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-(--border) p-10 text-center"
    >
      <SearchX class="size-8 text-(--text-secondary)" />
      <p class="font-semibold text-(--text-title)">{{ $t('pages.news.empty.title') }}</p>
      <p class="text-sm text-(--text-secondary)">{{ $t('pages.news.empty.description') }}</p>
      <UiButton type="button" variant="outline" @click="resetFilters">
        {{ $t('pages.news.empty.reset_cta') }}
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
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, Search, SearchX } from '@lucide/vue'
import { NEWS_CATEGORIES } from '~/types/article'

definePageMeta({
  pageBanner: {
    titleKey: 'pages.news.title',
    subtitleKey: 'pages.news.subtitle',
    breadcrumbKey: 'pages.news.seo_title'
  }
})

const { t } = useI18n()
const { articles } = useNews()

const search = ref('')
const activeCategory = ref<'all' | (typeof NEWS_CATEGORIES)[number]>('all')

const categoryOptions = computed(() => [
  { value: 'all' as const, label: t('pages.news.categories.all') },
  ...NEWS_CATEGORIES.map((value) => ({ value, label: t(`pages.news.categories.${value}`) }))
])

const filteredArticles = computed(() => {
  const query = search.value.trim().toLowerCase()

  const list = articles.filter((article) => {
    if (activeCategory.value !== 'all' && article.category !== activeCategory.value) return false
    if (query) {
      const haystack = `${article.title} ${article.excerpt}`.toLowerCase()
      if (!haystack.includes(query)) return false
    }
    return true
  })

  return [...list].sort((a, b) => {
    if (Boolean(a.featured) === Boolean(b.featured)) {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    }
    return a.featured ? -1 : 1
  })
})

const PAGE_SIZE = 9
const currentPage = ref(1)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredArticles.value.length / PAGE_SIZE)))

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredArticles.value.slice(start, start + PAGE_SIZE)
})

watch([search, activeCategory], () => {
  currentPage.value = 1
})

const resetFilters = () => {
  search.value = ''
  activeCategory.value = 'all'
}
</script>
