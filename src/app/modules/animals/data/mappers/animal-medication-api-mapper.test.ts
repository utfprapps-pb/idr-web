import { describe, expect, it } from 'vitest'

import { fromApi, toApi } from './animal-medication-api-mapper'

import type { AnimalMedicationApiResponse } from '../../domain/models/animal-medications-model'

const record: AnimalMedicationApiResponse = {
  id: 'medication-1',
  animalId: 'animal-1',
  productId: 'product-1',
  applicationDate: '2024-06-10',
  appliedDose: '10 ml',
  applicationWay: 'IM',
}

describe('animal-medication-api-mapper', () => {
  it('renomeia data e via de aplicação, ida e volta', () => {
    const model = fromApi(record)

    expect(model.date).toEqual(new Date(2024, 5, 10))
    expect(model.applicationMethod).toBe('IM')
    expect(toApi(model)).toMatchObject({
      applicationDate: '2024-06-10',
      appliedDose: '10 ml',
      applicationWay: 'IM',
    })
  })

  // Pendência 6 da matriz: o seletor ainda usa `input-uses` e a API exige `productId`.
  it.todo('envia o productId do catálogo /products')
})
