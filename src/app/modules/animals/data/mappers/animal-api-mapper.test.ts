import { describe, expect, it } from 'vitest'

import {
  fromApiDetails,
  fromApiListItem,
  toCreateRequest,
  toUpdateRequest,
} from './animal-api-mapper'

import type { AnimalApiResponse } from '../../domain/models/animals-model'

const record: AnimalApiResponse = {
  id: 'e0000000-0000-0000-0000-000000000002',
  propertyId: 'c0000000-0000-0000-0000-000000000001',
  animalMotherId: 'e0000000-0000-0000-0000-000000000001',
  animalMotherIdentifier: 'Mimosa',
  breedId: 'breed-1',
  breedName: 'Jersey',
  sizeId: 'a5000000-0000-0000-0000-000000000003',
  sizeName: 'Grande',
  identifier: 'Charmosa',
  gender: 'Fêmea',
  bornCondition: 'Vivo',
  bornDate: '2019-06-23',
  bornWeight: 32.5,
  previousWeight: 400,
  currentWeight: 450.5,
  ecc: 3.25,
}

const emptyRecord: AnimalApiResponse = {
  ...record,
  animalMotherId: null,
  animalMotherIdentifier: null,
  breedName: null,
  sizeId: null,
  sizeName: null,
  gender: null,
  bornCondition: null,
  bornDate: null,
  bornWeight: null,
  previousWeight: null,
  currentWeight: null,
  ecc: null,
}

describe('animal-api-mapper', () => {
  it('lê o detalhe com raça, porte e mãe como opções e a data no dia local', () => {
    const model = fromApiDetails(record)

    expect(model.name).toBe('Charmosa')
    expect(model.breed).toEqual({ value: 'breed-1', label: 'Jersey' })
    expect(model.mother).toEqual({
      value: 'e0000000-0000-0000-0000-000000000001',
      label: 'Mimosa',
    })
    expect(model.size).toEqual({
      value: 'a5000000-0000-0000-0000-000000000003',
      label: 'Grande',
    })
    expect(model.gender).toBe('Fêmea')
    expect(model.bornCondition).toBe('Vivo')
    expect(model.bornDate).toEqual(new Date(2019, 5, 23))
  })

  it('faz ida e volta sem perda dos campos de escrita', () => {
    expect(toUpdateRequest(fromApiDetails(record))).toEqual({
      identifier: 'Charmosa',
      breedId: 'breed-1',
      sizeId: 'a5000000-0000-0000-0000-000000000003',
      gender: 'Fêmea',
      animalMotherId: 'e0000000-0000-0000-0000-000000000001',
      bornDate: '2019-06-23',
      bornWeight: 32.5,
      bornCondition: 'Vivo',
    })
  })

  it('lê campos ausentes como vazios e os envia como null (o PUT apaga)', () => {
    const model = fromApiDetails(emptyRecord)

    expect(model).toMatchObject({
      size: { value: '', label: '' },
      gender: '',
      bornCondition: '',
      bornWeight: '',
      bornDate: null,
      mother: { value: '', label: '' },
    })
    expect(toUpdateRequest(model)).toEqual({
      identifier: 'Charmosa',
      breedId: 'breed-1',
      sizeId: null,
      gender: null,
      animalMotherId: null,
      bornDate: null,
      bornWeight: null,
      bornCondition: null,
    })
  })

  it('preserva valor antigo fora da lista na ida e volta', () => {
    const request = toUpdateRequest(fromApiDetails({ ...record, gender: 'F' }))

    expect(request.gender).toBe('F')
  })

  it('não envia mais o tipo de raça em texto', () => {
    expect(toCreateRequest(fromApiDetails(record))).not.toHaveProperty('type')
  })

  it('cria com o mesmo corpo da edição, sem campos de medida', () => {
    const request = toCreateRequest(fromApiDetails(record))

    expect(request).toEqual(toUpdateRequest(fromApiDetails(record)))
    expect(request).not.toHaveProperty('currentWeight')
    expect(request).not.toHaveProperty('ecc')
  })

  it('mapeia o item da lista para a tabela', () => {
    expect(fromApiListItem(record)).toEqual({
      id: 'e0000000-0000-0000-0000-000000000002',
      name: 'Charmosa',
      breed: 'Jersey',
      weight: '450.5',
      ecc: '3.25',
      milkProduction: '',
    })
    expect(fromApiListItem(emptyRecord)).toMatchObject({
      breed: '',
      weight: '',
      ecc: '',
    })
  })
})
