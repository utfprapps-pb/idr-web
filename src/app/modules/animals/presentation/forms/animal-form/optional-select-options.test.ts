import { describe, expect, it } from 'vitest'

import {
  NOT_INFORMED,
  fromOptionalSelectValue,
  optionalCatalogOptions,
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

const CATALOG = [
  { value: 'size-1', label: 'Pequena' },
  { value: 'size-3', label: 'Grande' },
]

const EMPTY = { value: '', label: '' }

describe('optionalCatalogOptions', () => {
  it('sem seleção: só o catálogo (o placeholder aparece)', () => {
    expect(optionalCatalogOptions(EMPTY, CATALOG)).toEqual(CATALOG)
  })

  it('com seleção do catálogo: "Não informado" primeiro, sem duplicar', () => {
    expect(optionalCatalogOptions(CATALOG[1]!, CATALOG)).toEqual([
      { value: NOT_INFORMED, label: 'Não informado' },
      ...CATALOG,
    ])
  })

  it('seleção ausente do catálogo continua como opção, com o próprio rótulo', () => {
    expect(
      optionalCatalogOptions({ value: 'old', label: 'Antigo' }, CATALOG)
    ).toEqual([
      { value: NOT_INFORMED, label: 'Não informado' },
      ...CATALOG,
      { value: 'old', label: 'Antigo' },
    ])
  })

  it('catálogo vazio (falhou ou carregando) mantém a seleção atual', () => {
    expect(optionalCatalogOptions(CATALOG[1]!, [])).toEqual([
      { value: NOT_INFORMED, label: 'Não informado' },
      CATALOG[1],
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
