import type { AnimalPurchaseModel } from '../../domain/models/animal-purchases-model'
import type { Filters, Sort } from '@/core/domain/types'

export type AnimalPurchaseFilters = Filters<AnimalPurchaseModel>
export type AnimalPurchaseSort = Sort<AnimalPurchaseModel>
