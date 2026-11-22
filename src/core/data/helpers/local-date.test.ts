import { describe, expect, it } from 'vitest'

import { fromLocalDate, toLocalDate } from './local-date'

describe('fromLocalDate', () => {
  it('lê yyyy-MM-dd como meia-noite local do mesmo dia', () => {
    const date = fromLocalDate('2024-06-10')

    expect(date.getFullYear()).toBe(2024)
    expect(date.getMonth()).toBe(5)
    expect(date.getDate()).toBe(10)
    expect(date.getHours()).toBe(0)
  })

  it('não volta um dia como new Date() faria em UTC-3', () => {
    expect(new Date('2024-06-10').getDate()).toBe(9)
    expect(fromLocalDate('2024-06-10').getDate()).toBe(10)
  })

  it('devolve null para data nula ou ausente vinda da API', () => {
    expect(fromLocalDate(null)).toBeNull()
    expect(fromLocalDate(undefined)).toBeNull()
  })
})

describe('toLocalDate', () => {
  it('formata o dia do calendário local', () => {
    expect(toLocalDate(new Date(2024, 5, 10))).toBe('2024-06-10')
  })

  it('mantém o dia local mesmo no fim do dia (que já é outro dia em UTC)', () => {
    expect(toLocalDate(new Date(2024, 5, 10, 23, 30))).toBe('2024-06-10')
  })

  it('devolve null quando o formulário não tem data', () => {
    expect(toLocalDate(null)).toBeNull()
    expect(toLocalDate(undefined)).toBeNull()
  })

  it('faz ida e volta sem deslocar o dia', () => {
    expect(toLocalDate(fromLocalDate('2024-01-01'))).toBe('2024-01-01')
  })
})
