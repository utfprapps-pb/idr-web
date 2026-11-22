import { describe, expect, it } from 'vitest'

import {
  NOT_INFORMED,
  fromOptionalSelectValue,
  optionalSelectOptions,
} from './optional-select-options'

const VALUES = ['Fêmea', 'Macho'] as const

describe('optionalSelectOptions', () => {
  it('campo vazio: só as opções, sem "Não informado" (o placeholder aparece)', () => {
    expect(optionalSelectOptions('', VALUES)).toEqual([
      { value: 'Fêmea', label: 'Fêmea' },
      { value: 'Macho', label: 'Macho' },
    ])
  })

  it('com valor: "Não informado" primeiro, para limpar o campo', () => {
    expect(optionalSelectOptions('Macho', VALUES)).toEqual([
      { value: NOT_INFORMED, label: 'Não informado' },
      { value: 'Fêmea', label: 'Fêmea' },
      { value: 'Macho', label: 'Macho' },
    ])
  })

  it('valor antigo fora da lista continua como opção, para ser preservado', () => {
    expect(optionalSelectOptions('Macho castrado', VALUES)).toEqual([
      { value: NOT_INFORMED, label: 'Não informado' },
      { value: 'Fêmea', label: 'Fêmea' },
      { value: 'Macho', label: 'Macho' },
      { value: 'Macho castrado', label: 'Macho castrado' },
    ])
  })
})

describe('fromOptionalSelectValue', () => {
  it('"Não informado" limpa o campo', () => {
    expect(fromOptionalSelectValue(NOT_INFORMED)).toBe('')
  })

  it('demais valores passam direto', () => {
    expect(fromOptionalSelectValue('Macho')).toBe('Macho')
  })
})
