<template>
  <div class="container mx-auto px-4 py-10 sm:py-14">
    <SeoManager :title="article?.title ?? $t('pages.news.detail.not_found_title')" :description="article?.excerpt" />

    <template v-if="article">
      <UiButton as-child variant="outline" size="sm" class="text-(--black)">
        <NuxtLink to="/news">
          <ArrowLeft class="size-4" />
          {{ $t('pages.news.detail.back_to_news') }}
        </NuxtLink>
      </UiButton>

      <div class="mt-6 grid gap-10 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div class="flex flex-wrap items-center gap-3">
            <UiBadge variant="secondary">{{ $t(`pages.news.categories.${article.category}`) }}</UiBadge>
            <span class="flex items-center gap-1 text-xs text-(--text-secondary)">
              <Calendar class="size-3.5" />
              {{ publishedLabel }}
            </span>
            <span class="flex items-center gap-1 text-xs text-(--text-secondary)">
              <Clock class="size-3.5" />
              {{ $t('pages.news.card.reading_time', { minutes: readingTime }) }}
            </span>
          </div>

          <h1 class="mt-3 text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">{{ article.title }}</h1>
          <p class="mt-2 text-sm text-(--text-secondary)">{{ article.author }}</p>

          <NewsImage :src="article.image" :alt="article.title" class="mt-6 aspect-video w-full rounded-xl" />

          <div class="mt-6 flex flex-col gap-4">
            <p
              v-for="(paragraph, index) in article.body"
              :key="index"
              class="text-base leading-relaxed text-(--text-dark)"
            >
              {{ paragraph }}
            </p>
          </div>

          <div v-if="article.keywords.length" class="mt-6 flex flex-wrap items-center gap-2">
            <span class="text-sm font-semibold text-(--text-title)">{{ $t('pages.news.detail.keywords_label') }} :</span>
            <UiBadge v-for="keyword in article.keywords" :key="keyword" variant="outline">{{ keyword }}</UiBadge>
          </div>
        </div>

        <aside class="lg:col-span-1">
          <div class="flex flex-col gap-6 lg:sticky" style="top: calc(var(--fixed-header-height, 0px) + 1.5rem)">
            <div v-if="relatedArticles.length" class="rounded-xl border border-(--border) p-5">
              <h2 class="font-bold text-(--primary-dark)">{{ $t('pages.news.detail.related_title') }}</h2>
              <div class="mt-4 flex flex-col gap-4">
                <NuxtLink
                  v-for="related in relatedArticles"
                  :key="related.slug"
                  :to="`/news/${related.slug}`"
                  class="group flex gap-3"
                >
                  <NewsImage :src="related.image" :alt="related.title" class="size-16 shrink-0 rounded-lg" />
                  <div class="flex-1">
                    <p class="text-xs text-(--text-secondary)">{{ formatDate(related.publishedAt) }}</p>
                    <p class="line-clamp-2 text-sm font-semibold text-(--primary-dark) group-hover:underline">
                      {{ related.title }}
                    </p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </template>

    <div v-else class="flex flex-col items-center gap-4 py-20 text-center">
      <SearchX class="size-10 text-(--text-secondary)" />
      <h1 class="text-2xl font-extrabold text-(--primary-dark)">{{ $t('pages.news.detail.not_found_title') }}</h1>
      <p class="max-w-md text-sm text-(--text-secondary)">{{ $t('pages.news.detail.not_found_description') }}</p>
      <UiButton as-child>
        <NuxtLink to="/news">{{ $t('pages.news.detail.back_to_news') }}</NuxtLink>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Calendar, Clock, SearchX } from '@lucide/vue'

definePageMeta({
  pageBanner: {
    parentKey: 'pages.news.seo_title',
    parentTo: '/news'
  }
})

const route = useRoute()
const { getArticleBySlug, getRelatedArticles } = useNews()

const slug = String(route.params.slug ?? '')
const article = getArticleBySlug(slug)

if (!article && import.meta.server) {
  const event = useRequestEvent()
  if (event) setResponseStatus(event, 404)
}

watchEffect(() => {
  if (article && route.meta.pageBanner) route.meta.pageBanner.title = article.title
})

const relatedArticles = article ? getRelatedArticles(article, 3) : []
const readingTime = article ? estimateReadingTime(article.body) : 0
const publishedLabel = article ? formatDate(article.publishedAt) : ''
</script>
