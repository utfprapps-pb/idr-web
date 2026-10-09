import type {
  AnimalMastitisCmtResults,
  AnimalMastitisDetailsModel,
  AnimalMastitisType,
} from '../../domain/models/animal-mastitides-model'

/**
 * Real backend fields: `diagnoseDate` (frontend: `date`), `mastitisType`
 * (frontend: `type`); `ad`/`ae`/`pd`/`pe` passthrough (mesmo nome).
 * `cmtResult` existe no backend mas não tem campo correspondente no
 * frontend — não é enviado/lido nesta entrega (decisão de escopo).
 */

export type AnimalMastitisApiRequest = {
  diagnoseDate: Date
  mastitisType: AnimalMastitisType
  ad: AnimalMastitisCmtResults
  ae: AnimalMastitisCmtResults
  pd: AnimalMastitisCmtResults
  pe: AnimalMastitisCmtResults
}

export type AnimalMastitisApiRecord = {
  diagnoseDate: string
  mastitisType: string
  ad: string
  ae: string
  pd: string
  pe: string
  cmtResult?: string
}

export function toApi(
  model: AnimalMastitisDetailsModel
): AnimalMastitisApiRequest {
  return {
    diagnoseDate: model.date,
    mastitisType: model.type,
    ad: model.ad,
    ae: model.ae,
    pd: model.pd,
    pe: model.pe,
  }
}

export function fromApi(
  record: AnimalMastitisApiRecord
): AnimalMastitisDetailsModel {
  return {
    date: new Date(record.diagnoseDate),
    type: record.mastitisType as AnimalMastitisType,
    ad: record.ad as AnimalMastitisCmtResults,
    ae: record.ae as AnimalMastitisCmtResults,
    pd: record.pd as AnimalMastitisCmtResults,
    pe: record.pe as AnimalMastitisCmtResults,
  }
}
