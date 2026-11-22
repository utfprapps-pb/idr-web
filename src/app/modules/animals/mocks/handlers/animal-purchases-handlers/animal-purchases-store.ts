import animalPurchasesData from '@database/animalPurchasesData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalPurchaseApiRequest } from '../../../data/mappers/animal-purchase-api-mapper'
import type { AnimalPurchaseApiResponse } from '../../../domain/models/animal-purchases-model'

export type AnimalPurchaseRecord = Omit<AnimalPurchaseApiResponse, 'animalId'>

/** A API não exige nenhum campo da compra (todos aceitam nulo); a lista fica vazia para manter o mesmo fluxo de validação dos outros mocks. */
export const ANIMAL_PURCHASE_REQUIRED_FIELDS: readonly (keyof AnimalPurchaseApiRequest)[] =
  []

export const animalPurchasesStore =
  createEventMockStore<AnimalPurchaseRecord>(animalPurchasesData)
