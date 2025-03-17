import type { AnimalChildBirthModel } from '../domain/models/animal-child-births-model'
import type { Filters, Sort } from '@/core/domain/types'

export type AnimalChildBirthFilters = Partial<
  Filters<keyof AnimalChildBirthModel>
>

export type AnimalChildBirthSort = Sort<keyof AnimalChildBirthModel>
