import { fromLocalDate, toLocalDate } from '@/core/data/helpers'

import type {
  AnimalMedicationApplicationMethod,
  AnimalMedicationDetailsModel,
  AnimalMedicationApiResponse,
} from '../../domain/models/animal-medications-model'

/**
 * Real backend fields: `applicationDate` (frontend: `date`),
 * `applicationWay` (frontend: `applicationMethod`), `appliedDose`
 * (mesmo nome).
 *
 * A medicação registra o que foi aplicado; o vínculo com o catálogo
 * `/products` é opcional. `product.value` é o `productId` (vazio = produto
 * não cadastrado). Nome e princípio ativo saem sempre dos campos do
 * formulário: com `productId`, o servidor os sobrescreve pelo catálogo.
 */

export type AnimalMedicationApiRequest = {
  applicationDate: string
  appliedDose: string
  applicationWay: AnimalMedicationApplicationMethod
  productId: string | null
  productName: string
  activePrinciple: string | null
}

export function toApi(
  model: AnimalMedicationDetailsModel
): AnimalMedicationApiRequest {
  return {
    applicationDate: toLocalDate(model.date),
    appliedDose: model.appliedDose,
    applicationWay: model.applicationMethod,
    productId: model.product.value || null,
    productName: model.productName.trim(),
    activePrinciple: model.activePrinciple.trim() || null,
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
    product: { value: record.productId ?? '', label: record.productName },
    productName: record.productName,
    activePrinciple: record.activePrinciple ?? '',
  }
}
