import animalDiseasesData from '@database/animalDiseasesData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalDiseaseApiRequest } from '../../../data/mappers/animal-disease-api-mapper'
import type { AnimalDiseaseApiResponse } from '../../../domain/models/animal-diseases-model'

export type AnimalDiseaseRecord = Omit<AnimalDiseaseApiResponse, 'animalId'>

/** Campos que `AnimalDiseaseApiRequest` não aceita nulos: sem eles o mock responde 400. */
export const ANIMAL_DISEASE_REQUIRED_FIELDS: readonly (keyof AnimalDiseaseApiRequest)[] =
  ['diagnosis']

export const animalDiseasesStore =
  createEventMockStore<AnimalDiseaseRecord>(animalDiseasesData)
