import { z } from 'zod'

/**
 * Opção obrigatória de uma lista no formulário. O tipo admite `''` porque a
 * API aceita o campo nulo: o registro abre na edição com o campo vazio (o
 * Select mostra o placeholder) e só não pode ser salvo assim. Mesmo padrão de
 * `requiredDateSchema`.
 */
export function requiredEnumSchema<
  const TValues extends readonly [string, ...string[]],
>(values: TValues, message: string) {
  type TValue = TValues[number]

  return z
    .union(
      [z.enum(values as unknown as [TValue, ...TValue[]]), z.literal('')],
      {
        errorMap: () => ({ message }),
      }
    )
    .refine((value) => value !== '', { message })
}
