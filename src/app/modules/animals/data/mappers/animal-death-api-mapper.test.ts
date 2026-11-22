import { describe, expect, it } from 'vitest'

import { fromApi, toApi } from './animal-death-api-mapper'

import type { AnimalDeathApiResponse } from '../../domain/models/animal-deaths-model'

const record: AnimalDeathApiResponse = {
  id: 'death-1',
  animalId: 'animal-1',
  reason: 'Pneumonia',
  deathDate: '2024-06-10',
}

describe('animal-death-api-mapper', () => {
  it('renomeia deathDate → date, ida e volta', () => {
    const model = fromApi(record)

    expect(model).toEqual({ reason: 'Pneumonia', date: new Date(2024, 5, 10) })
    expect(toApi(model)).toEqual({
      reason: 'Pneumonia',
      deathDate: '2024-06-10',
    })
  })
})
