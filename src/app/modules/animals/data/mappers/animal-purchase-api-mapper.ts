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
  datePurchase: Date
  birthDate: Date
  value: number
  weight: number | null
}

export function toApi(
  model: AnimalPurchaseDetailsModel
): AnimalPurchaseApiRequest {
  return {
    datePurchase: model.date,
    birthDate: model.birthDate,
    value: unmaskFloat(model.price),
    weight: model.weight ? unmaskFloat(model.weight) : null,
  }
}

export function fromApi(
  record: AnimalPurchaseApiResponse
): AnimalPurchaseDetailsModel {
  return {
    date: new Date(record.datePurchase),
    birthDate: new Date(record.birthDate),
    price: formatNumber(record.value, { prefix: 'R$' }),
    weight: formatNumber(record.weight ?? '', { suffix: 'kg' }),
  }
}
