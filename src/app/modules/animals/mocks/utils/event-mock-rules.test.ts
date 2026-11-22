import { describe, expect, it } from 'vitest'

import {
  isLocalDateTerm,
  matchesEventDate,
  missingRequiredFields,
  notFoundProblem,
  requiredFieldsProblem,
} from './event-mock-rules'

describe('missingRequiredFields', () => {
  it('aponta campos ausentes, nulos ou em branco', () => {
    expect(
      missingRequiredFields(
        { reason: '  ', bull: null, value: 0, ok: 'x' } as Record<
          string,
          unknown
        >,
        ['reason', 'bull', 'value', 'ok', 'missing']
      )
    ).toEqual(['reason', 'bull', 'missing'])
  })

  it('aceita corpo completo', () => {
    expect(missingRequiredFields({ reason: 'x' }, ['reason'])).toEqual([])
  })

  it('trata corpo vazio como todos os campos ausentes', () => {
    expect(missingRequiredFields(null, ['reason'])).toEqual(['reason'])
  })
})

describe('isLocalDateTerm', () => {
  it('reconhece só yyyy-MM-dd', () => {
    expect(isLocalDateTerm('2024-06-10')).toBe(true)
    expect(isLocalDateTerm('10/06/2024')).toBe(false)
    expect(isLocalDateTerm('2024-06')).toBe(false)
    expect(isLocalDateTerm('pneumonia')).toBe(false)
  })
})

describe('matchesEventDate', () => {
  const matches = matchesEventDate<{ deathDate: string | null }>('deathDate')

  it('com data, filtra pela data do evento', () => {
    expect(matches({ deathDate: '2024-06-10' }, '2024-06-10')).toBe(true)
    expect(matches({ deathDate: '2024-06-11' }, '2024-06-10')).toBe(false)
    expect(matches({ deathDate: null }, '2024-06-10')).toBe(false)
  })

  it('com termo que não é data, devolve todos (como a API)', () => {
    expect(matches({ deathDate: '2024-06-11' }, 'pneumonia')).toBe(true)
    expect(matches({ deathDate: null }, 'pneumonia')).toBe(true)
  })
})

describe('respostas de erro', () => {
  it('400 de validação em Problem Details, listando os campos', async () => {
    const response = requiredFieldsProblem(['reason', 'bull'])

    expect(response.status).toBe(400)
    expect(response.headers.get('Content-Type')).toBe(
      'application/problem+json'
    )
    expect(await response.json()).toEqual({
      type: 'urn:idr:problem:validacao',
      title: 'Erro de validação',
      status: 400,
      detail: 'Campos obrigatórios não informados: reason, bull',
    })
  })

  it('404 em Problem Details', async () => {
    const response = notFoundProblem('Óbito não encontrado')

    expect(response.status).toBe(404)
    expect(await response.json()).toMatchObject({
      type: 'urn:idr:problem:nao-encontrado',
      detail: 'Óbito não encontrado',
    })
  })
})
