import productsData from '@database/productsData.json'

import type { AnimalMedicationApiRequest } from '../../data/mappers/animal-medication-api-mapper'
import type { AnimalMedicationApiResponse } from '../../domain/models/animal-medications-model'

/**
 * Grava a medicação como a API: com `productId`, nome e princípio ativo vêm
 * do catálogo `/products`; sem ele, ficam os valores enviados.
 */
export function toAnimalMedicationApiResponse(
  body: AnimalMedicationApiRequest,
  id: string,
  animalId: string
): AnimalMedicationApiResponse {
  const product = productsData.find((item) => item.id === body.productId)

  return {
    ...body,
    id,
    animalId,
    productId: product?.id ?? null,
    productName: product?.name ?? body.productName,
    activePrinciple: product
      ? product.activePrinciple.name
      : body.activePrinciple,
  }
}
