import { describe, expect, it } from 'vitest'

import { animalFormSchema } from './animal-form-schema'

import type { AnimalDetailsModel } from '../../domain/models/animals-model'

const onlyRequired: AnimalDetailsModel = {
  name: 'Mimosa',
  breed: { value: 'breed-1', label: 'Jersey' },
  type: '',
  gender: '',
  mother: { value: '', label: '' },
  bornDate: null,
  bornWeight: '',
  bornCondition: '',
}

function messages(data: unknown): string[] {
  const result = animalFormSchema.safeParse(data)
  return result.success ? [] : result.error.issues.map(({ message }) => message)
}

describe('animalFormSchema', () => {
  it('aceita só nome e raça, com os demais campos vazios', () => {
    expect(animalFormSchema.parse(onlyRequired)).toEqual(onlyRequired)
  })

  it('exige o nome', () => {
    expect(messages({ ...onlyRequired, name: '' })).toEqual([
      'Nome é obrigatório',
    ])
  })

  it('exige a raça', () => {
    expect(
      messages({ ...onlyRequired, breed: { value: '', label: '' } })
    ).toEqual(['Raça é obrigatória'])
  })

  it('aceita valor antigo fora da lista, para preservá-lo', () => {
    expect(
      animalFormSchema.parse({ ...onlyRequired, gender: 'F', type: 'type 1' })
    ).toMatchObject({ gender: 'F', type: 'type 1' })
  })

  it('mantém todos os campos preenchidos no resultado', () => {
    const filled: AnimalDetailsModel = {
      ...onlyRequired,
      type: 'Grande',
      gender: 'Fêmea',
      mother: { value: 'mother-1', label: 'Mimosa' },
      bornDate: new Date(2019, 5, 23),
      bornWeight: '32,50 kg',
      bornCondition: 'Vivo',
    }

    expect(animalFormSchema.parse(filled)).toEqual(filled)
  })
})
