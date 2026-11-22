import animalPregnancyDiagnosesData from '@database/animalPregnancyDiagnosesData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalPregnancyDiagnosisApiRequest } from '../../../data/mappers/animal-pregnancy-diagnosis-api-mapper'
import type { AnimalPregnancyDiagnosisApiResponse } from '../../../domain/models/animal-pregnancy-diagnoses-model'

export type AnimalPregnancyDiagnosisRecord = Omit<
  AnimalPregnancyDiagnosisApiResponse,
  'animalId'
>

/** A API não exige nenhum campo do diagnóstico de gestação (todos aceitam nulo); a lista fica vazia para manter o mesmo fluxo de validação dos outros mocks. */
export const ANIMAL_PREGNANCY_DIAGNOSIS_REQUIRED_FIELDS: readonly (keyof AnimalPregnancyDiagnosisApiRequest)[] =
  []

export const animalPregnancyDiagnosesStore =
  createEventMockStore<AnimalPregnancyDiagnosisRecord>(
    animalPregnancyDiagnosesData
  )
