import type {
  AnimalDeathDetailsModel,
  AnimalDeathApiResponse,
} from '../../domain/models/animal-deaths-model'

/**
 * Real backend fields: `reason` (frontend: `reason`),
 * `deathDate` (frontend: `date`). Passthrough de valor,
 * só o nome do campo muda.
 */

export type AnimalDeathApiRequest = {
  reason: string
  deathDate: Date
}

export function toApi(model: AnimalDeathDetailsModel): AnimalDeathApiRequest {
  return {
    reason: model.reason,
    deathDate: model.date,
  }
}

export function fromApi(
  record: AnimalDeathApiResponse
): AnimalDeathDetailsModel {
  return {
    reason: record.reason,
    date: new Date(record.deathDate),
  }
}
