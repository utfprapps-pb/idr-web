import animalSalesData from '@database/animalSalesData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalSaleApiRequest } from '../../../data/mappers/animal-sale-api-mapper'
import type { AnimalSaleApiResponse } from '../../../domain/models/animal-sales-model'

export type AnimalSaleRecord = Omit<AnimalSaleApiResponse, 'animalId'>

/** A API não exige nenhum campo da venda (todos aceitam nulo); a lista fica vazia para manter o mesmo fluxo de validação dos outros mocks. */
export const ANIMAL_SALE_REQUIRED_FIELDS: readonly (keyof AnimalSaleApiRequest)[] =
  []

export const animalSalesStore =
  createEventMockStore<AnimalSaleRecord>(animalSalesData)
