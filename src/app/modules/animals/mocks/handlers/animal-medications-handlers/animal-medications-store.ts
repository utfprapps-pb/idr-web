import animalMedicationsData from '@database/animalMedicationsData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalMedicationApiRequest } from '../../../data/mappers/animal-medication-api-mapper'
import type { AnimalMedicationApiResponse } from '../../../domain/models/animal-medications-model'

export type AnimalMedicationRecord = Omit<
  AnimalMedicationApiResponse,
  'animalId'
>

/** Campos que `AnimalMedicationApiRequest` não aceita nulos: sem eles o mock responde 400. */
export const ANIMAL_MEDICATION_REQUIRED_FIELDS: readonly (keyof AnimalMedicationApiRequest)[] =
  ['applicationDate', 'productName', 'appliedDose', 'applicationWay']

export const animalMedicationsStore =
  createEventMockStore<AnimalMedicationRecord>(animalMedicationsData)
