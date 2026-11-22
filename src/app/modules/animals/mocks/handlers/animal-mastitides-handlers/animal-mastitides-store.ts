import animalMastitidesData from '@database/animalMastitidesData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalMastitisApiRequest } from '../../../data/mappers/animal-mastitis-api-mapper'
import type { AnimalMastitisApiResponse } from '../../../domain/models/animal-mastitides-model'

export type AnimalMastitisRecord = Omit<AnimalMastitisApiResponse, 'animalId'>

/** A API não exige nenhum campo da mastite (todos aceitam nulo); a lista fica vazia para manter o mesmo fluxo de validação dos outros mocks. */
export const ANIMAL_MASTITIS_REQUIRED_FIELDS: readonly (keyof AnimalMastitisApiRequest)[] =
  []

export const animalMastitidesStore =
  createEventMockStore<AnimalMastitisRecord>(animalMastitidesData)
