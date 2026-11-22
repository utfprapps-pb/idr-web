import animalDeathsData from '@database/animalDeathsData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalDeathApiRequest } from '../../../data/mappers/animal-death-api-mapper'
import type { AnimalDeathApiResponse } from '../../../domain/models/animal-deaths-model'

export type AnimalDeathRecord = Omit<AnimalDeathApiResponse, 'animalId'>

/** A API não exige nenhum campo do óbito (todos aceitam nulo); a lista fica vazia para manter o mesmo fluxo de validação dos outros mocks. */
export const ANIMAL_DEATH_REQUIRED_FIELDS: readonly (keyof AnimalDeathApiRequest)[] =
  []

export const animalDeathsStore =
  createEventMockStore<AnimalDeathRecord>(animalDeathsData)
