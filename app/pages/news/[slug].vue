<template>
  <div class="container mx-auto px-4 py-8 sm:py-12">
    <SeoManager :title="article?.title ?? $t('pages.news.detail.not_found_title')" :description="article?.excerpt" />

    <template v-if="article">
      <UiButton as-child variant="outline" size="sm" class="text-(--black)">
        <NuxtLink to="/news">
          <ArrowLeft class="size-4" />
          {{ $t('pages.news.detail.back_to_news') }}
        </NuxtLink>
      </UiButton>

      <div class="mt-6 grid gap-8 lg:grid-cols-3 lg:gap-12">
        <!-- En-tête article : toujours en premier -->
        <div class="lg:col-span-2">
          <div class="flex flex-wrap items-center gap-2 sm:gap-3">
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
          <h1 class="mt-3 text-xl font-extrabold leading-tight text-(--primary-dark) sm:text-2xl md:text-3xl">
            {{ article.title }}
          </h1>
          <p class="mt-2 text-sm text-(--text-secondary)">{{ article.author }}</p>
          <NewsImage :src="article.image" :alt="article.title" class="mt-5 aspect-video w-full rounded-xl sm:mt-6" />
        </div>

        <!-- Sidebar : après l'image sur mobile, colonne droite sticky sur desktop -->
        <aside class="lg:col-span-1 lg:row-span-2">
          <div class="lg:sticky" :style="{ top: `calc(var(--fixed-header-height, 0px) + 1.5rem)` }">
            <div v-if="relatedArticles.length" class="rounded-xl border border-(--border) p-4 sm:p-5">
              <h2 class="font-bold text-(--primary-dark)">{{ $t('pages.news.detail.related_title') }}</h2>
              <div class="mt-4 flex flex-col gap-4">
                <NuxtLink
                  v-for="related in relatedArticles"
                  :key="related.slug"
                  :to="`/news/${related.slug}`"
                  class="group flex gap-3"
                >
                  <NewsImage :src="related.image" :alt="related.title" class="size-14 shrink-0 rounded-lg sm:size-16" />
                  <div class="min-w-0 flex-1">
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

        <!-- Corps de l'article : après la sidebar sur mobile, sous l'en-tête sur desktop -->
        <div class="lg:col-span-2">
          <div class="flex flex-col gap-3 sm:gap-4">
            <p
              v-for="(paragraph, index) in article.body"
              :key="index"
              class="text-sm leading-relaxed text-(--text-dark) sm:text-base"
            >
              {{ paragraph }}
            </p>
          </div>
          <div v-if="article.keywords.length" class="mt-5 flex flex-wrap items-center gap-2 sm:mt-6">
            <span class="text-sm font-semibold text-(--text-title)">{{ $t('pages.news.detail.keywords_label') }} :</span>
            <UiBadge v-for="keyword in article.keywords" :key="keyword" variant="outline">{{ keyword }}</UiBadge>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="flex flex-col items-center gap-4 py-16 text-center sm:py-20">
      <SearchX class="size-10 text-(--text-secondary)" />
      <h1 class="text-xl font-extrabold text-(--primary-dark) sm:text-2xl">{{ $t('pages.news.detail.not_found_title') }}</h1>
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
