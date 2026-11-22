import { describe, expect, it } from 'vitest'

import { fromApi, toApi } from './animal-purchase-api-mapper'

import type { AnimalPurchaseApiResponse } from '../../domain/models/animal-purchases-model'

const record: AnimalPurchaseApiResponse = {
  id: 'purchase-1',
  animalId: 'animal-1',
  datePurchase: '2024-06-10',
  birthDate: '2023-01-31',
  value: 2800,
  weight: 320.25,
}

describe('animal-purchase-api-mapper', () => {
  it('lê as datas no dia local', () => {
    const model = fromApi(record)

    expect(model.date).toEqual(new Date(2024, 5, 10))
    expect(model.birthDate).toEqual(new Date(2023, 0, 31))
  })

  it('faz ida e volta sem perda', () => {
    expect(toApi(fromApi(record))).toEqual({
      datePurchase: '2024-06-10',
      birthDate: '2023-01-31',
      value: 2800,
      weight: 320.25,
    })
  })

  it('lê o valor nulo da API (aceito pela API) como vazio, ida e volta', () => {
    const model = fromApi({ ...record, value: null })

    expect(model.price).toBe('')
    expect(toApi(model).value).toBeNull()
  })
})
