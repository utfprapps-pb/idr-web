import type { PropertyModel } from '../domain/models/properties-model'
import type { Filters, Sort } from '@/core/domain/types'

export type PropertyFilters = Partial<Filters<PropertyModel>>
export type PropertySort = Sort<keyof PropertyModel>
