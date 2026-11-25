import { fromLocalDate, toLocalDate } from '@/core/data/helpers'

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
 * PUT (substituição completa) e omiti-lo apagaria o valor salvo. Tipo e
 * quartos nulos (a API aceita) viram `''` no formulário e voltam como `null`.
 */

export type AnimalMastitisApiRequest = {
  diagnoseDate: string | null
  mastitisType: AnimalMastitisType | null
  ad: AnimalMastitisCmtResults | null
  ae: AnimalMastitisCmtResults | null
  pd: AnimalMastitisCmtResults | null
  pe: AnimalMastitisCmtResults | null
  cmtResult?: string | null
}

export function toApi(
  model: AnimalMastitisDetailsModel
): AnimalMastitisApiRequest {
  return {
    diagnoseDate: toLocalDate(model.date),
    mastitisType: model.type || null,
    ad: model.ad || null,
    ae: model.ae || null,
    pd: model.pd || null,
    pe: model.pe || null,
    cmtResult: model.cmtResult,
  }
}

export function fromApi(
  record: AnimalMastitisApiResponse
): AnimalMastitisDetailsModel {
  return {
    date: fromLocalDate(record.diagnoseDate),
    type: (record.mastitisType ?? '') as AnimalMastitisType | '',
    ad: (record.ad ?? '') as AnimalMastitisCmtResults | '',
    ae: (record.ae ?? '') as AnimalMastitisCmtResults | '',
    pd: (record.pd ?? '') as AnimalMastitisCmtResults | '',
    pe: (record.pe ?? '') as AnimalMastitisCmtResults | '',
    cmtResult: record.cmtResult,
  }
}
