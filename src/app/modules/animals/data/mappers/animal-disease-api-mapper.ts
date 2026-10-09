import type { AnimalDiseaseDetailsModel } from '../../domain/models/animal-diseases-model'

/**
 * Real backend fields: `diagnosis` (frontend: `diagnostic`),
 * `diagnosisDate` (frontend: `diagnosticDate`). Passthrough de valor,
 * só o nome do campo muda.
 */

export type AnimalDiseaseApiRequest = {
  diagnosis: string
  diagnosisDate: Date
}

export type AnimalDiseaseApiRecord = {
  diagnosis: string
  diagnosisDate: string
}

export function toApi(
  model: AnimalDiseaseDetailsModel
): AnimalDiseaseApiRequest {
  return {
    diagnosis: model.diagnostic,
    diagnosisDate: model.diagnosticDate,
  }
}

export function fromApi(
  record: AnimalDiseaseApiRecord
): AnimalDiseaseDetailsModel {
  return {
    diagnostic: record.diagnosis,
    diagnosticDate: new Date(record.diagnosisDate),
  }
}
