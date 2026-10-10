import type { AnimalInseminationDetailsModel } from '../../domain/models/animal-inseminations-model'

/**
 * Real backend fields: `iaDate` (frontend: `date`), `bull` (frontend:
 * `sire`). Passthrough de valor, só o nome do campo muda — não é
 * tradução de enum.
 */

export type AnimalInseminationApiRequest = {
  iaDate: Date
  bull: AnimalInseminationDetailsModel['sire']
}

export function toApi(
  model: AnimalInseminationDetailsModel
): AnimalInseminationApiRequest {
  return {
    iaDate: model.date,
    bull: model.sire,
  }
}

export type AnimalInseminationApiRecord = {
  iaDate: string
  bull: string
}

export function fromApi(
  record: AnimalInseminationApiRecord
): AnimalInseminationDetailsModel {
  return {
    date: new Date(record.iaDate),
    sire: record.bull,
  }
}
