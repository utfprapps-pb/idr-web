import { z } from 'zod'

import { notFutureDateValidation } from '../validators/not-future-date-validation'

/**
 * Data obrigatória no formulário, até hoje. O tipo admite `null` porque a API
 * aceita evento sem data: o registro abre na edição com o campo vazio e só
 * não pode ser salvo assim. O `refine` não estreita o tipo de propósito: o
 * valor do formulário segue `Date | null`, como o modelo do evento.
 */
export function requiredDateSchema(message: string) {
  return z
    .date({ required_error: message, invalid_type_error: message })
    .refine(notFutureDateValidation, { message: 'Data inválida' })
    .nullable()
    .refine((date): boolean => date !== null, { message })
}
