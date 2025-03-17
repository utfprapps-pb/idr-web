import type { ForageModel } from '../domain/models/forages-model'
import type { Filters, Sort } from '@/core/domain/types'

export type ForageFilters = Partial<Filters<keyof ForageModel>>

export type ForageSort = Sort<keyof ForageModel>
