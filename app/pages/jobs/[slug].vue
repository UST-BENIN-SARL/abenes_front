<template>
  <div class="container mx-auto px-4 py-8 sm:py-12">
    <SeoManager :title="job?.title ?? $t('pages.jobs.detail.not_found_title')" :description="job?.shortDescription" />

    <template v-if="job">
      <UiButton as-child variant="outline" size="sm" class="text-(--black)">
        <NuxtLink to="/jobs">
          <ArrowLeft class="size-4" />
          {{ $t('pages.jobs.detail.back_to_jobs') }}
        </NuxtLink>
      </UiButton>

      <div class="mt-6 flex flex-col gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <UiBadge :variant="contractTypeBadgeVariant(job.contractType)">
            {{ $t(`pages.jobs.contract_types.${job.contractType}`) }}
          </UiBadge>
          <span class="text-xs font-semibold tracking-wide text-(--text-secondary) uppercase">
            {{ $t(`pages.jobs.departments.${job.department}`) }}
          </span>
        </div>

        <h1 class="text-xl font-extrabold leading-tight text-(--primary-dark) sm:text-2xl md:text-3xl">
          {{ job.title }}
        </h1>

        <div class="flex flex-wrap items-center gap-3 text-sm text-(--text-secondary) sm:gap-4">
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

        <p class="max-w-2xl text-sm text-(--text-dark) sm:text-base">{{ job.shortDescription }}</p>

        <UiButton as-child size="lg" class="mt-2 w-full sm:w-fit">
          <a href="#postuler">{{ $t('pages.jobs.detail.apply_cta') }}</a>
        </UiButton>
      </div>

      <div class="mt-8 grid gap-8 lg:grid-cols-5 lg:gap-12 sm:mt-12">
        <div class="flex flex-col gap-6 sm:gap-8 lg:col-span-3">
          <section>
            <h2 class="text-base font-bold text-(--primary-dark) sm:text-lg">{{ $t('pages.jobs.detail.missions_title') }}</h2>
            <ul class="mt-3 flex flex-col gap-2">
              <li v-for="item in job.missions" :key="item" class="flex items-start gap-2 text-sm text-(--text-dark)">
                <CheckCircle2 class="mt-0.5 size-4 shrink-0 text-(--primary)" />
                {{ item }}
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-base font-bold text-(--primary-dark) sm:text-lg">{{ $t('pages.jobs.detail.requirements_title') }}</h2>
            <ul class="mt-3 flex flex-col gap-2">
              <li v-for="item in job.requirements" :key="item" class="flex items-start gap-2 text-sm text-(--text-dark)">
                <CheckCircle2 class="mt-0.5 size-4 shrink-0 text-(--primary)" />
                {{ item }}
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-base font-bold text-(--primary-dark) sm:text-lg">{{ $t('pages.jobs.detail.benefits_title') }}</h2>
            <ul class="mt-3 flex flex-col gap-2">
              <li v-for="item in job.benefits" :key="item" class="flex items-start gap-2 text-sm text-(--text-dark)">
                <CheckCircle2 class="mt-0.5 size-4 shrink-0 text-(--primary)" />
                {{ item }}
              </li>
            </ul>
          </section>
        </div>

        <div id="postuler" class="lg:col-span-2">
          <div class="lg:sticky" :style="{ top: `calc(var(--fixed-header-height, 0px) + 1.5rem)` }">
            <JobApplicationForm :job="job" />
          </div>
        </div>
      </div>

      <section v-if="similarJobs.length" class="mt-10 sm:mt-14">
        <h2 class="text-base font-bold text-(--primary-dark) sm:text-lg">{{ $t('pages.jobs.detail.similar_title') }}</h2>
        <div class="mt-4 flex flex-col gap-4 sm:mt-6">
          <JobCard v-for="similar in similarJobs" :key="similar.slug" :job="similar" />
        </div>
      </section>
    </template>

    <div v-else class="flex flex-col items-center gap-4 py-16 text-center sm:py-20">
      <SearchX class="size-10 text-(--text-secondary)" />
      <h1 class="text-xl font-extrabold text-(--primary-dark) sm:text-2xl">{{ $t('pages.jobs.detail.not_found_title') }}</h1>
      <p class="max-w-md text-sm text-(--text-secondary)">{{ $t('pages.jobs.detail.not_found_description') }}</p>
      <UiButton as-child>
        <NuxtLink to="/jobs">{{ $t('pages.jobs.detail.back_to_jobs') }}</NuxtLink>
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Briefcase, Calendar, CheckCircle2, MapPin, SearchX } from '@lucide/vue'

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
