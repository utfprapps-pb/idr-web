import type { AnimalChildbirthModel } from '../../domain/models/animal-childbirths-model'
import type { Filters, Sort } from '@/core/domain/types'

export type AnimalChildbirthFilters = Partial<Filters<AnimalChildbirthModel>>

export type AnimalChildbirthSort = Sort<keyof AnimalChildbirthModel>
