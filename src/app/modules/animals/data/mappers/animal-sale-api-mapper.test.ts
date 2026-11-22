import { describe, expect, it } from 'vitest'

import { fromApi, toApi } from './animal-sale-api-mapper'

import type { AnimalSaleApiResponse } from '../../domain/models/animal-sales-model'

const record: AnimalSaleApiResponse = {
  id: 'sale-1',
  animalId: 'animal-1',
  dateSale: '2024-06-10',
  reason: 'DESCARTE',
  value: 3500.5,
  destination: 'ABATE',
  weight: 450,
}

describe('animal-sale-api-mapper', () => {
  it.each([
    ['VOLUNTARIA', 'VOLUNTARY'],
    ['DESCARTE', 'DISCARD'],
    ['EMERGENCIA', 'EMERGENCY'],
  ] as const)('traduz o motivo %s ↔ %s nos dois sentidos', (api, web) => {
    const model = fromApi({ ...record, reason: api })

    expect(model.reason).toBe(web)
    expect(toApi(model).reason).toBe(api)
  })

  it.each([
    ['ABATE', 'SLAUGHTER'],
    ['PRODUCAO', 'PRODUCTION'],
  ] as const)('traduz o destino %s ↔ %s nos dois sentidos', (api, web) => {
    const model = fromApi({ ...record, destination: api })

    expect(model.destination).toBe(web)
    expect(toApi(model).destination).toBe(api)
  })

  it('renomeia data e valor e faz ida e volta sem perda', () => {
    const model = fromApi(record)

    expect(model.date).toEqual(new Date(2024, 5, 10))
    expect(toApi(model)).toEqual({
      dateSale: '2024-06-10',
      value: 3500.5,
      destination: 'ABATE',
      reason: 'DESCARTE',
      weight: 450,
    })
  })

  it('lê motivo, destino e valor nulos da API (aceitos pela API) como vazios, ida e volta', () => {
    const model = fromApi({
      ...record,
      reason: null,
      destination: null,
      value: null,
    })

    expect(model).toMatchObject({ reason: '', destination: '', price: '' })
    expect(toApi(model)).toMatchObject({
      reason: null,
      destination: null,
      value: null,
    })
  })
})
