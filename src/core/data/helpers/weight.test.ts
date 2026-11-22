import { describe, expect, it } from 'vitest'

import { fromApiWeight, toApiWeight } from './weight'

describe('toApiWeight', () => {
  it('converte o peso mascarado em quilos', () => {
    expect(toApiWeight('450,50 kg')).toBe(450.5)
  })

  it('converte campo vazio em null', () => {
    expect(toApiWeight('')).toBeNull()
  })
})

describe('fromApiWeight', () => {
  it('formata quilos com um único sufixo kg', () => {
    const weight = fromApiWeight(450.5)

    expect(weight).toMatch(/450,50/)
    expect(weight.match(/kg/g)).toHaveLength(1)
  })

  it('faz ida e volta sem perder o valor', () => {
    expect(toApiWeight(fromApiWeight(32.75))).toBe(32.75)
  })

  it('não inventa peso quando a API manda null', () => {
    expect(toApiWeight(fromApiWeight(null))).toBeNull()
  })
})
