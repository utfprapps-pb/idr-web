import { z } from 'zod'

import { moneyValidation } from '@/core/validation/validators'

export const animalPurchaseFormSchema = z.object({
  date: z
    .date({
      required_error: 'Data de compra é obrigatória',
    })
    .max(new Date(), { message: 'Data inválida' }),
  birthDate: z
    .date({
      required_error: 'Data de nascimento é obrigatória',
    })
    .max(new Date(), { message: 'Data inválida' }),
  price: z.string().refine((value) => moneyValidation(value, 0.01), {
    message: 'O valor mínimo é R$0,01',
  }),
  weight: z.string().min(1, { message: 'Campo obrigatório' }),
})

export type AnimalPurchaseFormSchema = z.infer<typeof animalPurchaseFormSchema>
