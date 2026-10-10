import { fromLocalDate, toLocalDate } from '@/core/data/helpers'

import type {
  AnimalPregnancyDiagnosisDetailsModel,
  AnimalPregnancyDiagnosisApiResponse,
} from '../../domain/models/animal-pregnancy-diagnoses-model'

/**
 * Real backend fields: `diagnoseDate` (frontend: `date`), `lastIa`
 * (frontend: `lastInseminationDate`). Passthrough de valor, só o nome
 * do campo muda.
 */

export type AnimalPregnancyDiagnosisApiRequest = {
  diagnoseDate: string
  lastIa: string
}

export function toApi(
  model: AnimalPregnancyDiagnosisDetailsModel
): AnimalPregnancyDiagnosisApiRequest {
  return {
    diagnoseDate: toLocalDate(model.date),
    lastIa: toLocalDate(model.lastInseminationDate),
  }
}

export function fromApi(
  record: AnimalPregnancyDiagnosisApiResponse
): AnimalPregnancyDiagnosisDetailsModel {
  return {
    date: fromLocalDate(record.diagnoseDate),
    lastInseminationDate: fromLocalDate(record.lastIa),
  }
}
