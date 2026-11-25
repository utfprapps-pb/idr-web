import { afterEach, describe, expect, it, vi } from 'vitest'

import { requiredDateSchema } from './required-date-schema'

const schema = requiredDateSchema('Data obrigatória')

function messages(value: unknown): string[] {
  const result = schema.safeParse(value)
  return result.success ? [] : result.error.issues.map(({ message }) => message)
}

describe('requiredDateSchema', () => {
  it('aceita uma data até hoje', () => {
    expect(schema.parse(new Date(2024, 5, 10))).toEqual(new Date(2024, 5, 10))
  })

  it('recusa data nula (evento gravado sem data) com a mensagem do campo', () => {
    expect(messages(null)).toEqual(['Data obrigatória'])
  })

  it('recusa data ausente com a mensagem do campo', () => {
    expect(messages(undefined)).toEqual(['Data obrigatória'])
  })

  it('recusa data futura', () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    expect(messages(tomorrow)).toEqual(['Data inválida'])
  })

  describe('com a aba aberta na virada do dia', () => {
    afterEach(() => {
      vi.useRealTimers()
    })

    it('aceita a data do novo dia', () => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date(2026, 10, 22, 23, 0))
      const openedYesterday = requiredDateSchema('Data obrigatória')

      vi.setSystemTime(new Date(2026, 10, 23, 0, 30))

      expect(openedYesterday.safeParse(new Date(2026, 10, 23)).success).toBe(
        true
      )
    })
  })
})
