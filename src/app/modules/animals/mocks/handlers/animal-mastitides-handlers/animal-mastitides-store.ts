import animalMastitidesData from '@database/animalMastitidesData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalMastitisApiRequest } from '../../../data/mappers/animal-mastitis-api-mapper'
import type { AnimalMastitisApiResponse } from '../../../domain/models/animal-mastitides-model'

export type AnimalMastitisRecord = Omit<AnimalMastitisApiResponse, 'animalId'>

/** Campos que `AnimalMastitisApiRequest` não aceita nulos: sem eles o mock responde 400. */
export const ANIMAL_MASTITIS_REQUIRED_FIELDS: readonly (keyof AnimalMastitisApiRequest)[] =
  ['mastitisType', 'ad', 'ae', 'pd', 'pe']

export const animalMastitidesStore =
  createEventMockStore<AnimalMastitisRecord>(animalMastitidesData)
