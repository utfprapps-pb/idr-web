import { describe, expect, it } from 'vitest'

import { requiredEnumSchema } from './required-enum-schema'

const schema = requiredEnumSchema(['MALE', 'FEMALE'], 'Campo obrigatório')

function messages(value: unknown): string[] {
  const result = schema.safeParse(value)
  return result.success ? [] : result.error.issues.map(({ message }) => message)
}

describe('requiredEnumSchema', () => {
  it('aceita um valor da lista', () => {
    expect(schema.parse('FEMALE')).toBe('FEMALE')
  })

  it('recusa vazio (registro gravado sem o campo) com a mensagem do campo', () => {
    expect(messages('')).toEqual(['Campo obrigatório'])
  })

  it('recusa valor fora da lista ou ausente com a mensagem do campo', () => {
    expect(messages('OTHER')).toEqual(['Campo obrigatório'])
    expect(messages(undefined)).toEqual(['Campo obrigatório'])
  })
})
