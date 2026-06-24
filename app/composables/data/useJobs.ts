import { JOBS } from '~/data/jobs'
import type { Job } from '~/types/job'

export function useJobs() {
  const getJobBySlug = (slug: string): Job | undefined => JOBS.find((job) => job.slug === slug)

  const getSimilarJobs = (job: Job, limit = 3): Job[] =>
    JOBS.filter((item) => item.department === job.department && item.slug !== job.slug).slice(0, limit)

  return {
    jobs: JOBS,
    getJobBySlug,
    getSimilarJobs
  }
}
