import type { AnimalDeathModel } from '../../domain/models/animal-deaths-model'
import type { Filters, Sort } from '@/core/domain/types'

export type AnimalDeathFilters = Filters<AnimalDeathModel>
export type AnimalDeathSort = Sort<AnimalDeathModel>
