<template>
  <div class="container mx-auto px-4 py-10 sm:py-14">
    <SeoManager :title="job?.title ?? $t('pages.jobs.detail.not_found_title')" :description="job?.shortDescription" />

    <template v-if="job">
      <div class="flex flex-col gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <UiBadge :variant="contractTypeBadgeVariant(job.contractType)">
            {{ $t(`pages.jobs.contract_types.${job.contractType}`) }}
          </UiBadge>
          <span class="text-xs font-semibold tracking-wide text-(--text-secondary) uppercase">
            {{ $t(`pages.jobs.departments.${job.department}`) }}
          </span>
        </div>

        <h1 class="text-2xl font-extrabold text-(--primary-dark) sm:text-3xl">{{ job.title }}</h1>

        <div class="flex flex-wrap items-center gap-4 text-sm text-(--text-secondary)">
          <span class="flex items-center gap-1.5">
            <MapPin class="size-4 text-(--primary)" />
            {{ job.location }}
          </span>
          <span class="flex items-center gap-1.5">
            <Briefcase class="size-4 text-(--primary)" />
            {{ job.experienceLevel }}
          </span>
          <span class="flex items-center gap-1.5">
            <Calendar class="size-4 text-(--primary)" />
            {{ $t('pages.jobs.card.published_on', { date: publishedLabel }) }}
          </span>
        </div>

        <p class="max-w-2xl text-base text-(--text-dark)">{{ job.shortDescription }}</p>

        <UiButton as-child size="lg" class="mt-2 w-fit">
          <a href="#postuler">{{ $t('pages.jobs.detail.apply_cta') }}</a>
        </UiButton>
      </div>

      <div class="mt-12 grid gap-10 lg:grid-cols-5">
        <div class="flex flex-col gap-8 lg:col-span-3">
          <section>
            <h2 class="text-lg font-bold text-(--primary-dark)">{{ $t('pages.jobs.detail.missions_title') }}</h2>
            <ul class="mt-3 flex flex-col gap-2">
              <li v-for="item in job.missions" :key="item" class="flex items-start gap-2 text-sm text-(--text-dark)">
                <CheckCircle2 class="mt-0.5 size-4 shrink-0 text-(--primary)" />
                {{ item }}
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg font-bold text-(--primary-dark)">{{ $t('pages.jobs.detail.requirements_title') }}</h2>
            <ul class="mt-3 flex flex-col gap-2">
              <li
                v-for="item in job.requirements"
                :key="item"
                class="flex items-start gap-2 text-sm text-(--text-dark)"
              >
                <CheckCircle2 class="mt-0.5 size-4 shrink-0 text-(--primary)" />
                {{ item }}
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg font-bold text-(--primary-dark)">{{ $t('pages.jobs.detail.benefits_title') }}</h2>
            <ul class="mt-3 flex flex-col gap-2">
              <li v-for="item in job.benefits" :key="item" class="flex items-start gap-2 text-sm text-(--text-dark)">
                <CheckCircle2 class="mt-0.5 size-4 shrink-0 text-(--primary)" />
                {{ item }}
              </li>
            </ul>
          </section>
        </div>

        <div id="postuler" class="lg:col-span-2">
          <div class="lg:sticky" style="top: calc(var(--fixed-header-height, 0px) + 1.5rem)">
            <JobApplicationForm :job="job" />
          </div>
        </div>
      </div>

      <section v-if="similarJobs.length" class="mt-14">
        <h2 class="text-lg font-bold text-(--primary-dark)">{{ $t('pages.jobs.detail.similar_title') }}</h2>
        <div class="mt-6 flex flex-col gap-4">
          <JobCard v-for="similar in similarJobs" :key="similar.slug" :job="similar" />
        </div>
      </section>
    </template>

    <div v-else class="flex flex-col items-center gap-4 py-20 text-center">
      <SearchX class="size-10 text-(--text-secondary)" />
      <h1 class="text-2xl font-extrabold text-(--primary-dark)">{{ $t('pages.jobs.detail.not_found_title') }}</h1>
      <p class="max-w-md text-sm text-(--text-secondary)">{{ $t('pages.jobs.detail.not_found_description') }}</p>
      <UiButton as-child>
        <NuxtLink to="/jobs">{{ $t('pages.jobs.detail.back_to_jobs') }}</NuxtLink>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Briefcase, Calendar, CheckCircle2, MapPin, SearchX } from '@lucide/vue'

definePageMeta({
  pageBanner: {
    parentKey: 'pages.jobs.seo_title',
    parentTo: '/jobs'
  }
})

const route = useRoute()
const { getJobBySlug, getSimilarJobs } = useJobs()

const slug = String(route.params.slug ?? '')
const job = getJobBySlug(slug)

if (!job && import.meta.server) {
  const event = useRequestEvent()
  if (event) setResponseStatus(event, 404)
}

watchEffect(() => {
  if (job && route.meta.pageBanner) route.meta.pageBanner.title = job.title
})

const similarJobs = job ? getSimilarJobs(job, 3) : []
const publishedLabel = job ? formatDate(job.publishedAt) : ''
</script>
