import animalPregnancyDiagnosesData from '@database/animalPregnancyDiagnosesData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalPregnancyDiagnosisApiRequest } from '../../../data/mappers/animal-pregnancy-diagnosis-api-mapper'
import type { AnimalPregnancyDiagnosisApiResponse } from '../../../domain/models/animal-pregnancy-diagnoses-model'

export type AnimalPregnancyDiagnosisRecord = Omit<
  AnimalPregnancyDiagnosisApiResponse,
  'animalId'
>

/** Campos que `AnimalPregnancyDiagnosisApiRequest` não aceita nulos: sem eles o mock responde 400. */
export const ANIMAL_PREGNANCY_DIAGNOSIS_REQUIRED_FIELDS: readonly (keyof AnimalPregnancyDiagnosisApiRequest)[] =
  []

export const animalPregnancyDiagnosesStore =
  createEventMockStore<AnimalPregnancyDiagnosisRecord>(
    animalPregnancyDiagnosesData
  )
