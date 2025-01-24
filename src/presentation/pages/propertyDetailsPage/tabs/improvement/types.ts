import type { ImprovementModel } from '@/domain/models/improvementModel'
import type { Filters, Sort } from '@/domain/shared/types'

export type ImprovementFilters = Partial<Filters<keyof ImprovementModel>>

export type ImprovementSort = Sort<keyof ImprovementModel>
