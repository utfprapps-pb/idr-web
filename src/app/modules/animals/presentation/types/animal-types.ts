import type { AnimalModel } from '../../domain/models/animals-model'
import type { Filters, Sort } from '@/core/domain/types'

export type AnimalFilters = Partial<Filters<keyof AnimalModel>>

export type AnimalSort = Sort<keyof AnimalModel>
