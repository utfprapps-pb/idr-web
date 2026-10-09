import type { AnimalPregnancyDiagnosisDetailsModel } from '../../domain/models/animal-pregnancy-diagnoses-model'

/**
 * Real backend fields: `diagnoseDate` (frontend: `date`), `lastIa`
 * (frontend: `lastInseminationDate`). Passthrough de valor, só o nome
 * do campo muda.
 */

export type AnimalPregnancyDiagnosisApiRequest = {
  diagnoseDate: Date
  lastIa: Date
}

export type AnimalPregnancyDiagnosisApiRecord = {
  diagnoseDate: string
  lastIa: string
}

export function toApi(
  model: AnimalPregnancyDiagnosisDetailsModel
): AnimalPregnancyDiagnosisApiRequest {
  return {
    diagnoseDate: model.date,
    lastIa: model.lastInseminationDate,
  }
}

export function fromApi(
  record: AnimalPregnancyDiagnosisApiRecord
): AnimalPregnancyDiagnosisDetailsModel {
  return {
    date: new Date(record.diagnoseDate),
    lastInseminationDate: new Date(record.lastIa),
  }
}
