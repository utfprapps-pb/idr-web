import { describe, expect, it } from 'vitest'

import { fromApi, toApi } from './animal-childbirth-api-mapper'

import type { AnimalChildbirthApiResponse } from '../../domain/models/animal-childbirths-model'

const record: AnimalChildbirthApiResponse = {
  id: 'childbirth-1',
  animalId: 'animal-1',
  childbirthDate: '2024-06-10',
  gender: 'FEMALE',
  weight: 32.5,
  condition: 'ALIVE',
  breedId: 'breed-1',
  calfId: 'calf-1',
  breedName: 'Jersey',
  calfIdentifier: 'BZ-01',
}

describe('animal-childbirth-api-mapper', () => {
  it('monta as opções de raça e bezerro com os nomes da resposta', () => {
    const model = fromApi(record)

    expect(model.date).toEqual(new Date(2024, 5, 10))
    expect(model.breed).toEqual({ value: 'breed-1', label: 'Jersey' })
    expect(model.calf).toEqual({ value: 'calf-1', label: 'BZ-01' })
  })

  it('faz ida e volta sem perda', () => {
    expect(toApi(fromApi(record))).toEqual({
      childbirthDate: '2024-06-10',
      gender: 'FEMALE',
      weight: 32.5,
      condition: 'ALIVE',
      breedId: 'breed-1',
      calfId: 'calf-1',
    })
  })

  it('aceita parto sem bezerro cadastrado', () => {
    const model = fromApi({ ...record, calfId: null, calfIdentifier: null })

    expect(model.calf).toEqual({ value: '', label: '' })
    expect(toApi(model).calfId).toBeNull()
  })
})
