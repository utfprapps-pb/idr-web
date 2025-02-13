import type { AnimalModel } from '@/domain/models/animalModel'
import type { Filters, Sort } from '@/domain/shared/types'

export type AnimalFilters = Partial<Filters<keyof AnimalModel>>

export type AnimalSort = Sort<keyof AnimalModel>
