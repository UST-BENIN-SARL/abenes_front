export const JOB_DEPARTMENTS = ['technical', 'sales', 'logistics', 'finance', 'hr'] as const
export type JobDepartment = (typeof JOB_DEPARTMENTS)[number]

export const CONTRACT_TYPES = ['cdi', 'cdd', 'stage', 'alternance'] as const
export type ContractType = (typeof CONTRACT_TYPES)[number]

export interface Job {
  slug: string
  title: string
  department: JobDepartment
  contractType: ContractType
  location: string
  experienceLevel: string
  /** ISO date string. */
  publishedAt: string
  featured?: boolean
  shortDescription: string
  missions: string[]
  requirements: string[]
  benefits: string[]
}

export interface JobFiltersState {
  search: string
  departments: JobDepartment[]
  contractTypes: ContractType[]
  locations: string[]
}
