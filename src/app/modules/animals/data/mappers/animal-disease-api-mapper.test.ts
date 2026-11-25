import { describe, expect, it } from 'vitest'

import { fromApi, toApi } from './animal-disease-api-mapper'

import type { AnimalDiseaseApiResponse } from '../../domain/models/animal-diseases-model'

const record: AnimalDiseaseApiResponse = {
  id: 'disease-1',
  animalId: 'animal-1',
  diagnosis: 'Tristeza parasitária',
  diagnosisDate: '2024-06-10',
}

describe('animal-disease-api-mapper', () => {
  it('renomeia diagnosis → diagnostic, ida e volta', () => {
    const model = fromApi(record)

    expect(model).toEqual({
      diagnostic: 'Tristeza parasitária',
      diagnosticDate: new Date(2024, 5, 10),
    })
    expect(toApi(model)).toEqual({
      diagnosis: 'Tristeza parasitária',
      diagnosisDate: '2024-06-10',
    })
  })

  it('lê o diagnóstico nulo da API (aceito pela API) como vazio', () => {
    expect(fromApi({ ...record, diagnosis: null }).diagnostic).toBe('')
  })
})
