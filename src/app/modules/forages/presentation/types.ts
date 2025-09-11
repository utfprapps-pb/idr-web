import type { ForageModel } from '../domain/models/forages-model'
import type { Filters, Sort } from '@/core/domain/types'

export type ForageFilters = Filters<ForageModel>
export type ForageSort = Sort<ForageModel>
