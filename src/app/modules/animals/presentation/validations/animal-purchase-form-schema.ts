import { z } from 'zod'

import { requiredDateSchema } from '@/core/validation/schemas'
import { moneyValidation } from '@/core/validation/validators'

export const animalPurchaseFormSchema = z.object({
  date: requiredDateSchema('Data de compra é obrigatória'),
  birthDate: requiredDateSchema('Data de nascimento é obrigatória'),
  price: z.string().refine((value) => moneyValidation(value, 0.01), {
    message: 'O valor mínimo é R$0,01',
  }),
  weight: z.string().min(1, { message: 'Peso obrigatório' }),
})

export type AnimalPurchaseFormSchema = z.infer<typeof animalPurchaseFormSchema>
