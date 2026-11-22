import { describe, expect, it } from 'vitest'

import { fromApi, toApi } from './animal-mastitis-api-mapper'

import type { AnimalMastitisApiResponse } from '../../domain/models/animal-mastitides-model'

const record: AnimalMastitisApiResponse = {
  id: 'mastitis-1',
  animalId: 'animal-1',
  diagnoseDate: '2024-06-10',
  mastitisType: 'SUBCLINICAL',
  cmtResult: 'positivo em AD',
  ad: 'PLUS-TWO',
  ae: 'ABSENT',
  pd: 'PLUS-ONE',
  pe: 'PLUS-THREE',
}

describe('animal-mastitis-api-mapper', () => {
  it('renomeia data e tipo e mantém os quatro quartos', () => {
    const model = fromApi(record)

    expect(model.date).toEqual(new Date(2024, 5, 10))
    expect(model.type).toBe('SUBCLINICAL')
    expect([model.ad, model.ae, model.pd, model.pe]).toEqual([
      'PLUS-TWO',
      'ABSENT',
      'PLUS-ONE',
      'PLUS-THREE',
    ])
  })

  it('reenvia o cmtResult lido, que não aparece na tela e o PUT apagaria', () => {
    expect(toApi(fromApi(record))).toEqual({
      diagnoseDate: '2024-06-10',
      mastitisType: 'SUBCLINICAL',
      ad: 'PLUS-TWO',
      ae: 'ABSENT',
      pd: 'PLUS-ONE',
      pe: 'PLUS-THREE',
      cmtResult: 'positivo em AD',
    })
  })

  it('lê tipo e quartos nulos da API (aceitos pela API) como vazios, ida e volta', () => {
    const model = fromApi({
      ...record,
      mastitisType: null,
      ad: null,
      ae: null,
      pd: null,
      pe: null,
    })

    expect(model).toMatchObject({ type: '', ad: '', ae: '', pd: '', pe: '' })
    expect(toApi(model)).toMatchObject({
      mastitisType: null,
      ad: null,
      ae: null,
      pd: null,
      pe: null,
    })
  })
})
