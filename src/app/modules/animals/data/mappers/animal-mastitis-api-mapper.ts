import type {
  AnimalMastitisCmtResults,
  AnimalMastitisDetailsModel,
  AnimalMastitisType,
  AnimalMastitisApiResponse,
} from '../../domain/models/animal-mastitides-model'

/**
 * Real backend fields: `diagnoseDate` (frontend: `date`), `mastitisType`
 * (frontend: `type`); `ad`/`ae`/`pd`/`pe` passthrough (mesmo nome).
 * `cmtResult` não aparece na tela, mas é lido e reenviado: o update é um
 * PUT (substituição completa) e omiti-lo apagaria o valor salvo.
 */

export type AnimalMastitisApiRequest = {
  diagnoseDate: Date
  mastitisType: AnimalMastitisType
  ad: AnimalMastitisCmtResults
  ae: AnimalMastitisCmtResults
  pd: AnimalMastitisCmtResults
  pe: AnimalMastitisCmtResults
  cmtResult?: string | null
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
    cmtResult: model.cmtResult,
  }
}

export function fromApi(
  record: AnimalMastitisApiResponse
): AnimalMastitisDetailsModel {
  return {
    date: new Date(record.diagnoseDate),
    type: record.mastitisType as AnimalMastitisType,
    ad: record.ad as AnimalMastitisCmtResults,
    ae: record.ae as AnimalMastitisCmtResults,
    pd: record.pd as AnimalMastitisCmtResults,
    pe: record.pe as AnimalMastitisCmtResults,
    cmtResult: record.cmtResult,
  }
}
