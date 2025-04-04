import type { ImprovementModel } from '@/app/modules/improvements/domain/models/improvements-model'
import type { Filters, Sort } from '@/core/domain/types'

export type ImprovementFilters = Partial<Filters<ImprovementModel>>

export type ImprovementSort = Sort<keyof ImprovementModel>
