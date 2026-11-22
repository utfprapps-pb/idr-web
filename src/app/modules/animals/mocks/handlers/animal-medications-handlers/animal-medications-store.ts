import animalMedicationsData from '@database/animalMedicationsData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalMedicationApiResponse } from '../../../domain/models/animal-medications-model'

export type AnimalMedicationRecord = Omit<
  AnimalMedicationApiResponse,
  'animalId'
>

export const animalMedicationsStore =
  createEventMockStore<AnimalMedicationRecord>(animalMedicationsData)
