import type { AnimalDiseaseModel } from '../../domain/models/animal-diseases-model'
import type { Filters, Sort } from '@/core/domain/types'

export type AnimalDiseaseFilters = Partial<Filters<AnimalDiseaseModel>>

export type AnimalDiseaseSort = Sort<keyof AnimalDiseaseModel>
