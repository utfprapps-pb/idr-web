import type { AnimalInseminationModel } from '../../domain/models/animal-inseminations-model'
import type { Filters, Sort } from '@/core/domain/types'

export type AnimalInseminationFilters = Filters<AnimalInseminationModel>
export type AnimalInseminationSort = Sort<AnimalInseminationModel>
