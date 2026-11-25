import { afterEach, describe, expect, it, vi } from 'vitest'

import { notFutureDateValidation } from './not-future-date-validation'

describe('notFutureDateValidation', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('aceita qualquer horário de hoje e datas passadas', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 10, 22, 8, 0))

    expect(notFutureDateValidation(new Date(2026, 10, 22, 23, 59, 59))).toBe(
      true
    )
    expect(notFutureDateValidation(new Date(2026, 10, 21))).toBe(true)
  })

  it('recusa a partir de amanhã', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 10, 22, 23, 59))

    expect(notFutureDateValidation(new Date(2026, 10, 23))).toBe(false)
  })
})
