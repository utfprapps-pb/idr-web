import type { AnimalPregnancyDiagnosisModel } from '../../domain/models/animal-pregnancy-diagnoses-model'
import type { Filters, Sort } from '@/core/domain/types'

export type AnimalPregnancyDiagnosisFilters = Partial<
  Filters<AnimalPregnancyDiagnosisModel>
>
export type AnimalPregnancyDiagnosisSort = Sort<AnimalPregnancyDiagnosisModel>
