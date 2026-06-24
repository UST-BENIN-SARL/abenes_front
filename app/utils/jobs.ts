import type { ContractType } from '~/types/job'

export function buildSpontaneousApplicationLink() {
  return {
    path: '/contact',
    query: { subject: 'career' }
  }
}

export function contractTypeBadgeVariant(contractType: ContractType): 'default' | 'outline' {
  return contractType === 'cdi' || contractType === 'cdd' ? 'default' : 'outline'
}
