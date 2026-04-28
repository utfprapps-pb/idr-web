import type { ForageAvailabilityModel } from '../domain/models/forage-availability-model'
import type { Filters, Sort } from '@/core/domain/types'

export type ForageAvailabilityFilters = Filters<ForageAvailabilityModel>
export type ForageAvailabilitySort = Sort<ForageAvailabilityModel>
