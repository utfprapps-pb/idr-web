import { z } from 'zod'

import {
  moneyValidation,
  percentValidation,
} from '@/core/validation/validators'

export const machineFormSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório' }),
  amount: z.string().min(1, { message: 'Campo obrigatório' }),
  unitPrice: z.string().refine((value) => moneyValidation(value, 0.01), {
    message: 'O valor mínimo é R$0,01',
  }),
  percentDairyCattle: z.string().refine((value) => percentValidation(value), {
    message: 'Valor de 0,01% a 100%',
  }),
  usefulLife: z.string().min(1, { message: 'Campo obrigatório' }),
  acquisitionDate: z.date().max(new Date(), { message: 'Data inválida' }),
  moneyDairyCattle: z.string().refine((value) => moneyValidation(value, 0.01), {
    message: 'O valor mínimo é R$0,01',
  }),
})

export type MachineFormSchema = z.infer<typeof machineFormSchema>
