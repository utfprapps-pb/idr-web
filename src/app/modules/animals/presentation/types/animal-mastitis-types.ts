import type { AnimalMastitisModel } from '../../domain/models/animal-mastitides-model'
import type { Filters, Sort } from '@/core/domain/types'

export type AnimalMastitisFilters = Filters<AnimalMastitisModel>
export type AnimalMastitisSort = Sort<AnimalMastitisModel>
