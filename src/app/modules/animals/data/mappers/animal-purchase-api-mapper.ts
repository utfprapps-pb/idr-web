import { formatNumber, unmaskFloat } from '@/core/masker'

import type { AnimalPurchaseDetailsModel } from '../../domain/models/animal-purchases-model'

/**
 * Real backend fields: `datePurchase` (frontend: `date`), `birthDate`
 * (mesmo nome), `value` (frontend: `price`). `value` é um `BigDecimal`
 * (número puro) no backend, mas o frontend guarda `price` como string
 * já formatada/mascarada (ver `input.hook.ts`) — por isso a conversão
 * usa `unmaskFloat`/`formatNumber`, não é um passthrough de valor.
 *
 * `weight` existe só no frontend, sem campo correspondente no backend
 * — não é enviado no create/update, e não há como lê-lo de volta (fica
 * vazio), por decisão de escopo.
 */

export type AnimalPurchaseApiRequest = {
  datePurchase: Date
  birthDate: Date
  value: number
}

export type AnimalPurchaseApiRecord = {
  datePurchase: string
  birthDate: string
  value: number
}

export function toApi(
  model: AnimalPurchaseDetailsModel
): AnimalPurchaseApiRequest {
  return {
    datePurchase: model.date,
    birthDate: model.birthDate,
    value: unmaskFloat(model.price),
  }
}

export function fromApi(
  record: AnimalPurchaseApiRecord
): AnimalPurchaseDetailsModel {
  return {
    date: new Date(record.datePurchase),
    birthDate: new Date(record.birthDate),
    price: formatNumber(record.value, { prefix: 'R$' }),
    weight: '',
  }
}
