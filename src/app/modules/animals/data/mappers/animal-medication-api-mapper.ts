import type {
  AnimalMedicationApplicationMethod,
  AnimalMedicationDetailsModel,
} from '../../domain/models/animal-medications-model'

/**
 * Real backend fields: `applicationDate` (frontend: `date`),
 * `applicationWay` (frontend: `applicationMethod`), `appliedDose`
 * (mesmo nome). Passthrough de valor, só o nome do campo muda.
 *
 * `productId` (UUID real do catálogo `Product`) ↔ `product` (Option
 * do catálogo `input-uses`) não é religado nesta entrega — `product`/
 * `activeIngredient` continuam exatamente como estavam (não enviados/
 * lidos como `productId`), por decisão de escopo.
 */

export type AnimalMedicationApiRequest = {
  applicationDate: Date
  appliedDose: string
  applicationWay: AnimalMedicationApplicationMethod
  product: AnimalMedicationDetailsModel['product']
}

export type AnimalMedicationApiRecord = {
  applicationDate: string
  appliedDose: string
  applicationWay: string
  product: AnimalMedicationDetailsModel['product']
}

export function toApi(
  model: AnimalMedicationDetailsModel
): AnimalMedicationApiRequest {
  return {
    applicationDate: model.date,
    appliedDose: model.appliedDose,
    applicationWay: model.applicationMethod,
    product: model.product,
  }
}

export function fromApi(
  record: AnimalMedicationApiRecord
): AnimalMedicationDetailsModel {
  return {
    date: new Date(record.applicationDate),
    appliedDose: record.appliedDose,
    applicationMethod:
      record.applicationWay as AnimalMedicationApplicationMethod,
    product: record.product,
  }
}
