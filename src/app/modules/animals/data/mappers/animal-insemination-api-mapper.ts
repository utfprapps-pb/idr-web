import type { AnimalInseminationDetailsModel } from '../../domain/models/animal-inseminations-model'

/**
 * Real backend field: `bull` (frontend: `sire`). Passthrough de valor,
 * só o nome do campo muda — não é tradução de enum (ver AnimalSales
 * para o caso que de fato precisa de tradução de valor).
 */

export type AnimalInseminationApiRequest = {
  date: Date
  bull: AnimalInseminationDetailsModel['sire']
}

export function toApi(
  model: AnimalInseminationDetailsModel
): AnimalInseminationApiRequest {
  return {
    date: model.date,
    bull: model.sire,
  }
}

export function fromApi<
  TSire = AnimalInseminationDetailsModel['sire'],
>(record: { date: string; bull: TSire }): { date: Date; sire: TSire } {
  return {
    date: new Date(record.date),
    sire: record.bull,
  }
}
