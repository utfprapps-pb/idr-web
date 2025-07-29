import type { AnimalHeiferCalfStageModel } from '../../domain/models/animal-heifer-calf-stages-model'
import type { Filters, Sort } from '@/core/domain/types'

export type AnimalHeiferCalfStageFilters = Partial<
  Filters<AnimalHeiferCalfStageModel>
>

export type AnimalHeiferCalfStageSort = Sort<keyof AnimalHeiferCalfStageModel>
