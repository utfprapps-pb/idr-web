import animalDiseasesData from '@database/animalDiseasesData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalDiseaseApiRequest } from '../../../data/mappers/animal-disease-api-mapper'
import type { AnimalDiseaseApiResponse } from '../../../domain/models/animal-diseases-model'

export type AnimalDiseaseRecord = Omit<AnimalDiseaseApiResponse, 'animalId'>

/** A API não exige nenhum campo da doença (todos aceitam nulo); a lista fica vazia para manter o mesmo fluxo de validação dos outros mocks. */
export const ANIMAL_DISEASE_REQUIRED_FIELDS: readonly (keyof AnimalDiseaseApiRequest)[] =
  []

export const animalDiseasesStore =
  createEventMockStore<AnimalDiseaseRecord>(animalDiseasesData)
