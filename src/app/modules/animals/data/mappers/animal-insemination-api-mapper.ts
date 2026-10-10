import { fromLocalDate, toLocalDate } from '@/core/data/helpers'

import type {
  AnimalInseminationDetailsModel,
  AnimalInseminationApiResponse,
} from '../../domain/models/animal-inseminations-model'

/**
 * Real backend fields: `iaDate` (frontend: `date`), `bull` (frontend:
 * `sire`). Passthrough de valor, só o nome do campo muda — não é
 * tradução de enum.
 */

export type AnimalInseminationApiRequest = {
  iaDate: string
  bull: AnimalInseminationDetailsModel['sire']
}

export function toApi(
  model: AnimalInseminationDetailsModel
): AnimalInseminationApiRequest {
  return {
    iaDate: toLocalDate(model.date),
    bull: model.sire,
  }
}

export function fromApi(
  record: AnimalInseminationApiResponse
): AnimalInseminationDetailsModel {
  return {
    date: fromLocalDate(record.iaDate),
    sire: record.bull,
  }
}
