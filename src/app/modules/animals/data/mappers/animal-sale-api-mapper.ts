import { formatNumber, unmaskFloat } from '@/core/masker'

import type {
  AnimalSaleDestination,
  AnimalSaleDetailsModel,
  AnimalSaleReason,
} from '../../domain/models/animal-sales-model'

/**
 * Real backend fields: `dateSale` (frontend: `date`), `value`
 * (frontend: `price`), `destination`/`reason` (mesmo nome de campo,
 * mas tradução de VALOR de enum — backend em português, frontend em
 * inglês). `value` é um `BigDecimal` (número puro) no backend, mas o
 * frontend guarda `price` como string já formatada/mascarada (ver
 * `input.hook.ts`) — por isso a conversão usa `unmaskFloat`/
 * `formatNumber`, não é um passthrough de valor.
 *
 * `weight` existe só no frontend, sem campo correspondente no backend
 * — não é enviado no create/update, e não há como lê-lo de volta (fica
 * vazio), por decisão de escopo.
 */

type BackendReason = 'VOLUNTARIA' | 'DESCARTE' | 'EMERGENCIA'
type BackendDestination = 'ABATE' | 'PRODUCAO'

const REASON_TO_FRONTEND: Record<BackendReason, AnimalSaleReason> = {
  VOLUNTARIA: 'VOLUNTARY',
  DESCARTE: 'DISCARD',
  EMERGENCIA: 'EMERGENCY',
}

const REASON_TO_BACKEND: Record<AnimalSaleReason, BackendReason> = {
  VOLUNTARY: 'VOLUNTARIA',
  DISCARD: 'DESCARTE',
  EMERGENCY: 'EMERGENCIA',
}

const DESTINATION_TO_FRONTEND: Record<
  BackendDestination,
  AnimalSaleDestination
> = {
  ABATE: 'SLAUGHTER',
  PRODUCAO: 'PRODUCTION',
}

const DESTINATION_TO_BACKEND: Record<
  AnimalSaleDestination,
  BackendDestination
> = {
  SLAUGHTER: 'ABATE',
  PRODUCTION: 'PRODUCAO',
}

export type AnimalSaleApiRequest = {
  dateSale: Date
  value: number
  destination: BackendDestination
  reason: BackendReason
}

export type AnimalSaleApiRecord = {
  dateSale: string
  value: number
  destination: string
  reason: string
}

export function toApi(model: AnimalSaleDetailsModel): AnimalSaleApiRequest {
  return {
    dateSale: model.date,
    value: unmaskFloat(model.price),
    destination: DESTINATION_TO_BACKEND[model.destination],
    reason: REASON_TO_BACKEND[model.reason],
  }
}

export function fromApi(record: AnimalSaleApiRecord): AnimalSaleDetailsModel {
  return {
    date: new Date(record.dateSale),
    price: formatNumber(record.value, { prefix: 'R$' }),
    destination:
      DESTINATION_TO_FRONTEND[record.destination as BackendDestination],
    reason: REASON_TO_FRONTEND[record.reason as BackendReason],
    weight: '',
  }
}
