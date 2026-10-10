import { fromLocalDate, toLocalDate } from '@/core/data/helpers'

import type {
  AnimalDiseaseDetailsModel,
  AnimalDiseaseApiResponse,
} from '../../domain/models/animal-diseases-model'

/**
 * Real backend fields: `diagnosis` (frontend: `diagnostic`),
 * `diagnosisDate` (frontend: `diagnosticDate`). Passthrough de valor,
 * só o nome do campo muda.
 */

export type AnimalDiseaseApiRequest = {
  diagnosis: string
  diagnosisDate: string
}

export function toApi(
  model: AnimalDiseaseDetailsModel
): AnimalDiseaseApiRequest {
  return {
    diagnosis: model.diagnostic,
    diagnosisDate: toLocalDate(model.diagnosticDate),
  }
}

export function fromApi(
  record: AnimalDiseaseApiResponse
): AnimalDiseaseDetailsModel {
  return {
    diagnostic: record.diagnosis,
    diagnosticDate: fromLocalDate(record.diagnosisDate),
  }
}
