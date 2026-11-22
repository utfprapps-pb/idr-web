import animalDeathsData from '@database/animalDeathsData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalDeathApiRequest } from '../../../data/mappers/animal-death-api-mapper'
import type { AnimalDeathApiResponse } from '../../../domain/models/animal-deaths-model'

export type AnimalDeathRecord = Omit<AnimalDeathApiResponse, 'animalId'>

/** Campos que `AnimalDeathApiRequest` não aceita nulos: sem eles o mock responde 400. */
export const ANIMAL_DEATH_REQUIRED_FIELDS: readonly (keyof AnimalDeathApiRequest)[] =
  ['reason']

export const animalDeathsStore =
  createEventMockStore<AnimalDeathRecord>(animalDeathsData)
