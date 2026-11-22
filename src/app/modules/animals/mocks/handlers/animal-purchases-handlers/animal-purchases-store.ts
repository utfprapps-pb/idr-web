import animalPurchasesData from '@database/animalPurchasesData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalPurchaseApiRequest } from '../../../data/mappers/animal-purchase-api-mapper'
import type { AnimalPurchaseApiResponse } from '../../../domain/models/animal-purchases-model'

export type AnimalPurchaseRecord = Omit<AnimalPurchaseApiResponse, 'animalId'>

/** Campos que `AnimalPurchaseApiRequest` não aceita nulos: sem eles o mock responde 400. */
export const ANIMAL_PURCHASE_REQUIRED_FIELDS: readonly (keyof AnimalPurchaseApiRequest)[] =
  ['value']

export const animalPurchasesStore =
  createEventMockStore<AnimalPurchaseRecord>(animalPurchasesData)
