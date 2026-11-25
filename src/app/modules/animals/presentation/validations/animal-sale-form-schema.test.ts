import { describe, expect, it } from 'vitest'

import { animalSaleFormSchema } from './animal-sale-form-schema'

function priceMessages(price: string): string[] {
  const result = animalSaleFormSchema.safeParse({ price })
  if (result.success) return []
  return result.error.issues
    .filter((issue) => issue.path[0] === 'price')
    .map(({ message }) => message)
}

describe('animalSaleFormSchema', () => {
  it('pede o valor quando o campo está vazio (registro antigo sem valor)', () => {
    expect(priceMessages('')).toEqual(['Valor é obrigatório'])
  })

  it('mantém o valor mínimo para valores abaixo de R$0,01', () => {
    expect(priceMessages('R$ 0,00')).toEqual(['O valor mínimo é R$0,01'])
  })

  it('aceita valor válido', () => {
    expect(priceMessages('R$ 1.500,00')).toEqual([])
  })
})
