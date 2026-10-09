import type { AnimalPurchaseDetailsModel } from '../../domain/models/animal-purchases-model'

/**
 * Real backend fields: `datePurchase` (frontend: `date`), `birthDate`
 * (mesmo nome), `value` (frontend: `price`). Passthrough de valor, só
 * o nome do campo muda.
 *
 * `weight` existe só no frontend, sem campo correspondente no backend
 * — não é enviado no create/update, e não há como lê-lo de volta (fica
 * vazio), por decisão de escopo.
 */

export type AnimalPurchaseApiRequest = {
  datePurchase: Date
  birthDate: Date
  value: string
}

export type AnimalPurchaseApiRecord = {
  datePurchase: string
  birthDate: string
  value: string
}

export function toApi(
  model: AnimalPurchaseDetailsModel
): AnimalPurchaseApiRequest {
  return {
    datePurchase: model.date,
    birthDate: model.birthDate,
    value: model.price,
  }
}

export function fromApi(
  record: AnimalPurchaseApiRecord
): AnimalPurchaseDetailsModel {
  return {
    date: new Date(record.datePurchase),
    birthDate: new Date(record.birthDate),
    price: record.value,
    weight: '',
  }
}
