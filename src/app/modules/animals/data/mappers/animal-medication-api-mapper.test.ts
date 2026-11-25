import { describe, expect, it } from 'vitest'

import { fromApi, toApi } from './animal-medication-api-mapper'

import type {
  AnimalMedicationApiResponse,
  AnimalMedicationDetailsModel,
} from '../../domain/models/animal-medications-model'

const record: AnimalMedicationApiResponse = {
  id: 'medication-1',
  animalId: 'animal-1',
  productId: 'product-1',
  productName: 'Ivomec',
  activePrinciple: 'Ivermectina',
  applicationDate: '2024-06-10',
  appliedDose: '10 ml',
  applicationWay: 'IM',
}

const notRegistered: AnimalMedicationDetailsModel = {
  date: new Date(2024, 5, 10),
  product: { label: 'Produto não cadastrado', value: '' },
  productName: '  Remédio caseiro ',
  activePrinciple: '',
  appliedDose: '5 ml',
  applicationMethod: 'SC',
}

describe('animal-medication-api-mapper', () => {
  it('renomeia data e via de aplicação, ida e volta', () => {
    const model = fromApi(record)

    expect(model.date).toEqual(new Date(2024, 5, 10))
    expect(model.applicationMethod).toBe('IM')
    expect(toApi(model)).toEqual({
      applicationDate: '2024-06-10',
      appliedDose: '10 ml',
      applicationWay: 'IM',
      productId: 'product-1',
      productName: 'Ivomec',
      activePrinciple: 'Ivermectina',
    })
  })

  it('monta o produto do catálogo como opção, com nome e princípio ativo', () => {
    expect(fromApi(record)).toMatchObject({
      product: { value: 'product-1', label: 'Ivomec' },
      productName: 'Ivomec',
      activePrinciple: 'Ivermectina',
    })
  })

  it('lê produto não cadastrado com valor vazio e princípio ativo nulo', () => {
    expect(
      fromApi({
        ...record,
        productId: null,
        productName: 'Remédio caseiro',
        activePrinciple: null,
      })
    ).toMatchObject({
      product: { value: '', label: 'Remédio caseiro' },
      productName: 'Remédio caseiro',
      activePrinciple: '',
    })
  })

  it('envia produto não cadastrado sem productId, com o nome digitado', () => {
    expect(toApi(notRegistered)).toMatchObject({
      productId: null,
      productName: 'Remédio caseiro',
      activePrinciple: null,
    })
  })

  it('envia o princípio ativo digitado, sem espaços nas pontas', () => {
    expect(
      toApi({ ...notRegistered, activePrinciple: ' Ivermectina ' })
    ).toMatchObject({ activePrinciple: 'Ivermectina' })
  })
})
