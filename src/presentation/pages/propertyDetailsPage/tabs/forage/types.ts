import type { ForageModel } from '@/domain/models/forageModel'
import type { Filters, Sort } from '@/domain/shared/types'

export type ForageFilters = Partial<Filters<keyof ForageModel>>

export type ForageSort = Sort<keyof ForageModel>
