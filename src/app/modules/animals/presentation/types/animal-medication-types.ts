import type { AnimalMedicationModel } from '../../domain/models/animal-medications-model'
import type { Filters, Sort } from '@/core/domain/types'

export type AnimalMedicationFilters = Filters<AnimalMedicationModel>
export type AnimalMedicationSort = Sort<AnimalMedicationModel>
