import animalInseminationsData from '@database/animalInseminationsData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalInseminationApiRequest } from '../../../data/mappers/animal-insemination-api-mapper'
import type { AnimalInseminationApiResponse } from '../../../domain/models/animal-inseminations-model'

export type AnimalInseminationRecord = Omit<
  AnimalInseminationApiResponse,
  'animalId'
>

/** Campos que `AnimalInseminationApiRequest` não aceita nulos: sem eles o mock responde 400. */
export const ANIMAL_INSEMINATION_REQUIRED_FIELDS: readonly (keyof AnimalInseminationApiRequest)[] =
  ['iaDate', 'bull']

export const animalInseminationsStore =
  createEventMockStore<AnimalInseminationRecord>(animalInseminationsData)
