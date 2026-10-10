import {
  DESTINATION_TO_BACKEND,
  REASON_TO_BACKEND,
} from '../../data/mappers/animal-sale-api-mapper'

import type {
  AnimalSaleApiResponse,
  AnimalSaleDestination,
  AnimalSaleReason,
} from '../../domain/models/animal-sales-model'

type AnimalSaleSeed = {
  id: string
  date: string
  price: string | number
  weight: string | number
  reason: string
  destination: string
}

/** Seed record (enums em inglês) -> real API shape (enums em português). */
export function toAnimalSaleApiResponse(
  sale: AnimalSaleSeed,
  animalId: string
): AnimalSaleApiResponse {
  return {
    id: sale.id,
    animalId,
    dateSale: sale.date,
    value: Number(sale.price),
    weight: Number(sale.weight),
    reason: REASON_TO_BACKEND[sale.reason as AnimalSaleReason] ?? sale.reason,
    destination:
      DESTINATION_TO_BACKEND[sale.destination as AnimalSaleDestination] ??
      sale.destination,
  }
}
