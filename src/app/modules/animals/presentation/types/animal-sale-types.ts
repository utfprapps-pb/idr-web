import type { AnimalSaleModel } from '../../domain/models/animal-sales-model'
import type { Filters, Sort } from '@/core/domain/types'

export type AnimalSaleFilters = Filters<AnimalSaleModel>
export type AnimalSaleSort = Sort<AnimalSaleModel>
