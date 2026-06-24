<template>
  <div>
    <SeoManager :title="$t('pages.jobs.seo_title')" />

    <div class="container mx-auto px-4 py-10 sm:py-14">
      <div class="flex flex-col gap-8 lg:flex-row lg:gap-10">
        <aside class="hidden lg:block lg:w-64 lg:shrink-0">
          <div
            class="rounded-xl border border-(--border) p-5 lg:sticky"
            style="top: calc(var(--fixed-header-height, 0px) + 1.5rem)"
          >
            <JobFiltersPanel
              v-model="filters"
              :department-options="departmentOptions"
              :contract-type-options="contractTypeOptions"
              :location-options="locationOptions"
            />
          </div>
        </aside>

        <div class="flex-1">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-(--border) pb-4">
            <div class="flex items-center gap-3">
              <UiButton type="button" variant="outline" size="sm" class="lg:hidden" @click="showMobileFilters = true">
                <SlidersHorizontal class="size-4" />
                {{ $t('pages.jobs.filters.toggle_cta') }}
                <UiBadge v-if="activeFilterCount" variant="secondary">{{ activeFilterCount }}</UiBadge>
              </UiButton>
              <p class="text-sm text-(--text-secondary)">
                {{ $t('pages.jobs.results_count', { count: filteredJobs.length }) }}
              </p>
            </div>
          </div>

          <div v-if="paginatedJobs.length" class="mt-6 flex flex-col gap-4">
            <JobCard v-for="job in paginatedJobs" :key="job.slug" :job="job" />
          </div>

          <div
            v-else
            class="mt-10 flex flex-col items-center gap-3 rounded-xl border border-dashed border-(--border) p-10 text-center"
          >
            <SearchX class="size-8 text-(--text-secondary)" />
            <p class="font-semibold text-(--text-title)">{{ $t('pages.jobs.empty.title') }}</p>
            <p class="text-sm text-(--text-secondary)">{{ $t('pages.jobs.empty.description') }}</p>
            <UiButton type="button" variant="outline" @click="resetFilters">
              {{ $t('pages.jobs.empty.reset_cta') }}
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

          <div class="mt-10 flex flex-col items-center gap-3 rounded-xl bg-(--primary-dark) p-8 text-center text-white">
            <Send class="size-7" />
            <p class="text-lg font-bold">{{ $t('pages.jobs.spontaneous.title') }}</p>
            <p class="max-w-md text-sm text-white/85">{{ $t('pages.jobs.spontaneous.description') }}</p>
            <UiButton as-child variant="secondary" class="mt-1">
              <NuxtLink :to="spontaneousLink">{{ $t('pages.jobs.spontaneous.cta') }}</NuxtLink>
            </UiButton>
          </div>
        </div>
      </div>
    </div>

    <UiDialog v-model:open="showMobileFilters">
      <UiDialogContent class="max-h-[85vh] overflow-y-auto">
        <UiDialogHeader>
          <UiDialogTitle>{{ $t('pages.jobs.filters.title') }}</UiDialogTitle>
        </UiDialogHeader>
        <JobFiltersPanel
          v-model="filters"
          :department-options="departmentOptions"
          :contract-type-options="contractTypeOptions"
          :location-options="locationOptions"
        />
        <UiDialogFooter>
          <UiButton type="button" class="w-full" @click="showMobileFilters = false">
            {{ $t('pages.jobs.filters.show_results') }}
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft, ChevronRight, SearchX, Send, SlidersHorizontal } from '@lucide/vue'
import type { JobFiltersState } from '~/types/job'

definePageMeta({
  pageBanner: {
    titleKey: 'pages.jobs.title',
    subtitleKey: 'pages.jobs.subtitle',
    breadcrumbKey: 'pages.jobs.seo_title'
  }
})

const { t } = useI18n()
const { jobs } = useJobs()

const spontaneousLink = buildSpontaneousApplicationLink()

const filters = ref<JobFiltersState>({
  search: '',
  departments: [],
  contractTypes: [],
  locations: []
})

const showMobileFilters = ref(false)

const departmentOptions = computed(() => {
  const departments: string[] = []
  for (const job of jobs) {
    if (!departments.includes(job.department)) departments.push(job.department)
  }
  return departments.map((value) => ({ value, label: t(`pages.jobs.departments.${value}`) }))
})

const contractTypeOptions = computed(() => {
  const types: string[] = []
  for (const job of jobs) {
    if (!types.includes(job.contractType)) types.push(job.contractType)
  }
  return types.map((value) => ({ value, label: t(`pages.jobs.contract_types.${value}`) }))
})

const locationOptions = computed(() => {
  const locations = [...new Set(jobs.map((job) => job.location))].sort()
  return locations.map((value) => ({ value, label: value }))
})

const activeFilterCount = computed(
  () =>
    filters.value.departments.length +
    filters.value.contractTypes.length +
    filters.value.locations.length +
    (filters.value.search ? 1 : 0)
)

const filteredJobs = computed(() => {
  const search = filters.value.search.trim().toLowerCase()

  const list = jobs.filter((job) => {
    if (filters.value.departments.length && !filters.value.departments.includes(job.department)) return false
    if (filters.value.contractTypes.length && !filters.value.contractTypes.includes(job.contractType)) return false
    if (filters.value.locations.length && !filters.value.locations.includes(job.location)) return false
    if (search) {
      const haystack = `${job.title} ${job.location} ${job.shortDescription}`.toLowerCase()
      if (!haystack.includes(search)) return false
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

const totalPages = computed(() => Math.max(1, Math.ceil(filteredJobs.value.length / PAGE_SIZE)))

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredJobs.value.slice(start, start + PAGE_SIZE)
})

watch(
  filters,
  () => {
    currentPage.value = 1
  },
  { deep: true }
)

const resetFilters = () => {
  filters.value = { search: '', departments: [], contractTypes: [], locations: [] }
}
</script>
