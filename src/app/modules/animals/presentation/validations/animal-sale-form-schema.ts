import { z } from 'zod'

import { requiredDateSchema } from '@/core/validation/schemas'
import { moneyValidation } from '@/core/validation/validators'

export const animalSaleFormSchema = z.object({
  date: requiredDateSchema('Data de venda é obrigatória'),
  reason: z.enum(['VOLUNTARY', 'DISCARD', 'EMERGENCY'], {
    message: 'Campo obrigatório',
  }),
  destination: z.enum(['SLAUGHTER', 'PRODUCTION'], {
    message: 'Campo obrigatório',
  }),
  price: z.string().refine((value) => moneyValidation(value, 0.01), {
    message: 'O valor mínimo é R$0,01',
  }),
  weight: z.string().min(1, { message: 'Peso obrigatório' }),
})

export type AnimalSaleFormSchema = z.infer<typeof animalSaleFormSchema>
