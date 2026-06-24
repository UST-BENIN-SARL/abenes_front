<template>
  <div
    class="group flex flex-col gap-4 rounded-xl border border-(--border) bg-white p-5 transition-shadow hover:shadow-lg sm:flex-row sm:items-center"
  >
    <div
      class="flex size-12 shrink-0 items-center justify-center rounded-full bg-(--accent-gray-light) text-(--primary-dark)"
    >
      <component :is="departmentIcon" class="size-5" />
    </div>

    <div class="flex-1">
      <div class="flex flex-wrap items-center gap-2">
        <UiBadge :variant="contractTypeBadgeVariant(job.contractType)">
          {{ $t(`pages.jobs.contract_types.${job.contractType}`) }}
        </UiBadge>
        <span class="text-xs font-semibold tracking-wide text-(--text-secondary) uppercase">
          {{ $t(`pages.jobs.departments.${job.department}`) }}
        </span>
      </div>

      <NuxtLink :to="`/jobs/${job.slug}`" class="mt-1.5 block text-lg font-bold text-(--primary-dark) hover:underline">
        {{ job.title }}
      </NuxtLink>

      <p class="mt-1 line-clamp-2 text-sm text-(--text-secondary)">{{ job.shortDescription }}</p>

      <div class="mt-2 flex flex-wrap items-center gap-3 text-xs text-(--text-secondary)">
        <span class="flex items-center gap-1">
          <MapPin class="size-3.5" />
          {{ job.location }}
        </span>
        <span class="flex items-center gap-1">
          <Briefcase class="size-3.5" />
          {{ job.experienceLevel }}
        </span>
        <span class="flex items-center gap-1">
          <Calendar class="size-3.5" />
          {{ $t('pages.jobs.card.published_on', { date: publishedLabel }) }}
        </span>
      </div>
    </div>

    <UiButton as-child size="sm" class="shrink-0 self-start sm:self-center">
      <NuxtLink :to="`/jobs/${job.slug}`">
        {{ $t('pages.jobs.card.cta_details') }}
        <ArrowRight class="size-4" />
      </NuxtLink>
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Briefcase, Calculator, Calendar, MapPin, TrendingUp, Truck, Users, Wrench } from '@lucide/vue'
import type { Job, JobDepartment } from '~/types/job'

const props = defineProps<{
  job: Job
}>()

const DEPARTMENT_ICONS: Record<JobDepartment, unknown> = {
  technical: Wrench,
  sales: TrendingUp,
  logistics: Truck,
  finance: Calculator,
  hr: Users
}

const departmentIcon = computed(() => DEPARTMENT_ICONS[props.job.department])
const publishedLabel = computed(() => formatDate(props.job.publishedAt))
</script>
