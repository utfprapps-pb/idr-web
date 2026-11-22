import { describe, expect, it } from 'vitest'

import {
  EMPTY_COMMAND_VALUE,
  findByCommandValue,
  toCommandValue,
} from './combobox-value'

const NONE = { label: 'Nenhuma', value: '' }
const MIMOSA = { label: 'Mimosa', value: 'a1' }

describe('toCommandValue', () => {
  it('troca o valor vazio pelo sentinela (o cmdk não destaca item sem valor)', () => {
    expect(toCommandValue('')).toBe(EMPTY_COMMAND_VALUE)
  })

  it('mantém os demais valores como texto', () => {
    expect(toCommandValue('a1')).toBe('a1')
    expect(toCommandValue(42)).toBe('42')
  })
})

describe('findByCommandValue', () => {
  it('devolve o item original de valor vazio ao receber o sentinela', () => {
    expect(findByCommandValue([NONE, MIMOSA], EMPTY_COMMAND_VALUE)).toBe(NONE)
  })

  it('devolve o item pelo valor', () => {
    expect(findByCommandValue([NONE, MIMOSA], 'a1')).toBe(MIMOSA)
    expect(
      findByCommandValue([{ label: 'Um', value: 1 }], toCommandValue(1))
    ).toEqual({ label: 'Um', value: 1 })
  })

  it('não encontra valor desconhecido', () => {
    expect(findByCommandValue([NONE, MIMOSA], 'x')).toBeUndefined()
  })
})
