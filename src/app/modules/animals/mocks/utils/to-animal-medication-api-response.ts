import productsData from '@database/productsData.json'

import { validationProblem } from './event-mock-rules'

import type { AnimalMedicationApiRequest } from '../../data/mappers/animal-medication-api-mapper'
import type { AnimalMedicationApiResponse } from '../../domain/models/animal-medications-model'

function findProduct(productId: string | null) {
  return productsData.find((item) => item.id === productId)
}

/**
 * `productId` fora do catálogo: a API responde 400 (`validacao`) com esta
 * mensagem. Sem `productId` (produto não cadastrado) não há o que checar.
 */
export function unknownProductProblem(productId: string | null) {
  if (!productId || findProduct(productId)) return undefined

  return validationProblem(`Produto com o id ${productId} não encontrado`)
}

/**
 * Grava a medicação como a API: com `productId`, nome e princípio ativo vêm
 * do catálogo `/products`; sem ele, ficam os valores enviados.
 */
export function toAnimalMedicationRecord(
  body: AnimalMedicationApiRequest
): Omit<AnimalMedicationApiResponse, 'id' | 'animalId'> {
  const product = findProduct(body.productId)

  return {
    ...body,
    productName: product?.name ?? body.productName,
    activePrinciple: product
      ? product.activePrinciple.name
      : body.activePrinciple,
  }
}
