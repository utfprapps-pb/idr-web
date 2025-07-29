import type { PropertyModel } from '../domain/models/properties-model'
import type { Filters, Sort } from '@/core/domain/types'

export type PropertyFilters = Filters<PropertyModel>
export type PropertySort = Sort<PropertyModel>
