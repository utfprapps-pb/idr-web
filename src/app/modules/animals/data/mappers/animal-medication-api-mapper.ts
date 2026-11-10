import { fromLocalDate, toLocalDate } from '@/core/data/helpers'

import type {
  AnimalMedicationApplicationMethod,
  AnimalMedicationDetailsModel,
  AnimalMedicationApiResponse,
} from '../../domain/models/animal-medications-model'

/**
 * Real backend fields: `applicationDate` (frontend: `date`),
 * `applicationWay` (frontend: `applicationMethod`), `appliedDose`
 * (mesmo nome). Passthrough de valor, só o nome do campo muda.
 *
 * `productId` (UUID real do catálogo `Product`) ↔ `product` (Option
 * do catálogo `input-uses`) ainda não é religado: a API não devolve
 * produto legível, então o GET entrega um produto vazio (o mesmo do
 * formulário inicial) e a tela pede para escolher de novo — em vez de
 * `undefined`, que quebrava o formulário de edição.
 */

const NO_PRODUCT: AnimalMedicationDetailsModel['product'] = {
  label: '',
  value: 0,
}

export type AnimalMedicationApiRequest = {
  applicationDate: string
  appliedDose: string
  applicationWay: AnimalMedicationApplicationMethod
  product: AnimalMedicationDetailsModel['product']
}

export function toApi(
  model: AnimalMedicationDetailsModel
): AnimalMedicationApiRequest {
  return {
    applicationDate: toLocalDate(model.date),
    appliedDose: model.appliedDose,
    applicationWay: model.applicationMethod,
    product: model.product,
  }
}

export function fromApi(
  record: AnimalMedicationApiResponse
): AnimalMedicationDetailsModel {
  return {
    date: fromLocalDate(record.applicationDate),
    appliedDose: record.appliedDose,
    applicationMethod:
      record.applicationWay as AnimalMedicationApplicationMethod,
    product: NO_PRODUCT,
  }
}
