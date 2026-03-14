import type { NutritionalBalancingModel } from '../../domain/models/nutritional-balancings-model'
import type { Filters, Sort } from '@/core/domain/types'

export type NutritionalBalancingFilters = Filters<NutritionalBalancingModel>
export type NutritionalBalancingSort = Sort<NutritionalBalancingModel>
