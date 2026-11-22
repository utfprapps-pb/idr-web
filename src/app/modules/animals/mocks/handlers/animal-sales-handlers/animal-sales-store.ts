import animalSalesData from '@database/animalSalesData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalSaleApiRequest } from '../../../data/mappers/animal-sale-api-mapper'
import type { AnimalSaleApiResponse } from '../../../domain/models/animal-sales-model'

export type AnimalSaleRecord = Omit<AnimalSaleApiResponse, 'animalId'>

/** Campos que `AnimalSaleApiRequest` não aceita nulos: sem eles o mock responde 400. */
export const ANIMAL_SALE_REQUIRED_FIELDS: readonly (keyof AnimalSaleApiRequest)[] =
  ['value', 'destination', 'reason']

export const animalSalesStore =
  createEventMockStore<AnimalSaleRecord>(animalSalesData)
