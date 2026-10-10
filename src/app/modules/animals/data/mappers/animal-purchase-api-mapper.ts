import {
  fromApiWeight,
  fromLocalDate,
  toApiWeight,
  toLocalDate,
} from '@/core/data/helpers'
import { formatNumber, unmaskFloat } from '@/core/masker'

import type {
  AnimalPurchaseDetailsModel,
  AnimalPurchaseApiResponse,
} from '../../domain/models/animal-purchases-model'

/**
 * Real backend fields: `datePurchase` (frontend: `date`), `birthDate`
 * (mesmo nome), `value` (frontend: `price`). `value` é um `BigDecimal`
 * (número puro) no backend, mas o frontend guarda `price` como string
 * já formatada/mascarada (ver `input.hook.ts`) — por isso a conversão
 * usa `unmaskFloat`/`formatNumber`, não é um passthrough de valor.
 * `weight` segue a mesma regra: número (kg) na API, string mascarada
 * (`"450,00 kg"`) no formulário.
 */

export type AnimalPurchaseApiRequest = {
  datePurchase: string
  birthDate: string
  value: number
  weight: number | null
}

export function toApi(
  model: AnimalPurchaseDetailsModel
): AnimalPurchaseApiRequest {
  return {
    datePurchase: toLocalDate(model.date),
    birthDate: toLocalDate(model.birthDate),
    value: unmaskFloat(model.price),
    weight: toApiWeight(model.weight),
  }
}

export function fromApi(
  record: AnimalPurchaseApiResponse
): AnimalPurchaseDetailsModel {
  return {
    date: fromLocalDate(record.datePurchase),
    birthDate: fromLocalDate(record.birthDate),
    price: formatNumber(record.value, { prefix: 'R$' }),
    weight: fromApiWeight(record.weight),
  }
}
