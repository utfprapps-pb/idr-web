import { describe, expect, it } from 'vitest'

import { fromApi, toApi } from './animal-pregnancy-diagnosis-api-mapper'

import type { AnimalPregnancyDiagnosisApiResponse } from '../../domain/models/animal-pregnancy-diagnoses-model'

const record: AnimalPregnancyDiagnosisApiResponse = {
  id: 'pregnancy-diagnosis-1',
  animalId: 'animal-1',
  diagnoseDate: '2024-06-10',
  lastIa: '2024-04-01',
}

describe('animal-pregnancy-diagnosis-api-mapper', () => {
  it('renomeia lastIa → lastInseminationDate, ida e volta', () => {
    const model = fromApi(record)

    expect(model).toEqual({
      date: new Date(2024, 5, 10),
      lastInseminationDate: new Date(2024, 3, 1),
    })
    expect(toApi(model)).toEqual({
      diagnoseDate: '2024-06-10',
      lastIa: '2024-04-01',
    })
  })
})
