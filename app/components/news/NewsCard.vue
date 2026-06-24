<template>
  <div
    class="group flex flex-col overflow-hidden rounded-xl border border-(--border) bg-white transition-shadow hover:shadow-lg"
  >
    <NuxtLink :to="`/news/${article.slug}`" class="block">
      <NewsImage :src="article.image" :alt="article.title" class="aspect-video w-full" />
    </NuxtLink>

    <div class="flex flex-1 flex-col gap-3 p-4">
      <div class="flex items-center justify-between gap-2">
        <UiBadge variant="secondary">{{ $t(`pages.news.categories.${article.category}`) }}</UiBadge>
        <span class="text-xs text-(--text-secondary)">{{ publishedLabel }}</span>
      </div>

      <NuxtLink
        :to="`/news/${article.slug}`"
        class="line-clamp-2 font-bold text-(--primary-dark) hover:underline"
      >
        {{ article.title }}
      </NuxtLink>

      <p class="line-clamp-3 flex-1 text-sm text-(--text-secondary)">{{ article.excerpt }}</p>

      <div class="mt-1 flex items-center justify-between gap-2">
        <span class="flex items-center gap-1 text-xs text-(--text-secondary)">
          <Clock class="size-3.5" />
          {{ $t('pages.news.card.reading_time', { minutes: readingTime }) }}
        </span>
        <UiButton as-child variant="ghost" size="sm" class="text-(--primary)">
          <NuxtLink :to="`/news/${article.slug}`">
            {{ $t('pages.news.card.cta_details') }}
            <ArrowRight class="size-4" />
          </NuxtLink>
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Clock } from '@lucide/vue'
import type { Article } from '~/types/article'

const props = defineProps<{
  article: Article
}>()

const readingTime = computed(() => estimateReadingTime(props.article.body))
const publishedLabel = computed(() => formatDate(props.article.publishedAt))
</script>
