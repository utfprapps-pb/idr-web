import { describe, expect, it } from 'vitest'

import { animalMedicationFormSchema } from './animal-medication-form-schema'

import type { AnimalMedicationDetailsModel } from '../../domain/models/animal-medications-model'

const fromCatalog: AnimalMedicationDetailsModel = {
  date: new Date(2024, 5, 10),
  product: {
    value: 'product-1',
    label: 'Ivomec',
    extraData: { activePrinciple: 'Ivermectina' },
  },
  productName: 'Ivomec',
  activePrinciple: 'Ivermectina',
  appliedDose: '10 ml',
  applicationMethod: 'IM',
}

const notRegistered: AnimalMedicationDetailsModel = {
  ...fromCatalog,
  product: { value: '', label: '' },
  productName: 'Remédio caseiro',
  activePrinciple: '',
}

function messages(data: unknown): string[] {
  const result = animalMedicationFormSchema.safeParse(data)
  return result.success ? [] : result.error.issues.map(({ message }) => message)
}

describe('animalMedicationFormSchema', () => {
  it('aceita produto do catálogo', () => {
    expect(animalMedicationFormSchema.parse(fromCatalog)).toEqual(fromCatalog)
  })

  it('não exige o nome digitado quando o produto é do catálogo', () => {
    expect(messages({ ...fromCatalog, productName: '' })).toEqual([])
  })

  it('aceita produto não cadastrado sem princípio ativo', () => {
    expect(messages(notRegistered)).toEqual([])
  })

  it('exige o nome do produto não cadastrado', () => {
    expect(messages({ ...notRegistered, productName: '' })).toEqual([
      'Nome do produto é obrigatório',
    ])
  })

  it('não aceita nome só com espaços', () => {
    const result = animalMedicationFormSchema.safeParse({
      ...notRegistered,
      productName: '   ',
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.path).toEqual(['productName'])
  })

  it('aceita nome e princípio ativo com até 255 caracteres', () => {
    expect(
      messages({
        ...notRegistered,
        productName: 'a'.repeat(255),
        activePrinciple: 'b'.repeat(255),
      })
    ).toEqual([])
  })

  it('recusa nome e princípio ativo com mais de 255 caracteres', () => {
    const result = animalMedicationFormSchema.safeParse({
      ...notRegistered,
      productName: 'a'.repeat(256),
      activePrinciple: 'b'.repeat(256),
    })

    expect(
      result.error?.issues.map(({ path, message }) => [path, message])
    ).toEqual([
      [['productName'], 'Máximo de 255 caracteres'],
      [['activePrinciple'], 'Máximo de 255 caracteres'],
    ])
  })
})
