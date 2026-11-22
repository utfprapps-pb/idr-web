import { describe, expect, it } from 'vitest'

import { fromApi, toApi } from './animal-insemination-api-mapper'

import type { AnimalInseminationApiResponse } from '../../domain/models/animal-inseminations-model'

const record: AnimalInseminationApiResponse = {
  id: 'insemination-1',
  animalId: 'animal-1',
  iaDate: '2024-06-10',
  bull: 'Touro X',
}

describe('animal-insemination-api-mapper', () => {
  it('renomeia iaDate → date e bull → sire, ida e volta', () => {
    const model = fromApi(record)

    expect(model).toEqual({ date: new Date(2024, 5, 10), sire: 'Touro X' })
    expect(toApi(model)).toEqual({ iaDate: '2024-06-10', bull: 'Touro X' })
  })

  it('lê o touro nulo da API (aceito pela API) como vazio', () => {
    expect(fromApi({ ...record, bull: null }).sire).toBe('')
  })
})
