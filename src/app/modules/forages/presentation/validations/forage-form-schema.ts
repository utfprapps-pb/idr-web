import { z } from 'zod'

import { optionSchema } from '@/core/validation/schemas'
import { moneyValidation } from '@/core/validation/validators'

export const forageFormSchema = z.object({
  cultivation: optionSchema.refine(
    ({ label, value }) => label !== '' && value !== '',
    {
      message: 'Campo obrigatório',
    }
  ),
  area: z.string().min(1, { message: 'Campo obrigatório' }),
  averageCost: z.string().refine((value) => moneyValidation(value, 0.01), {
    message: 'O valor mínimo é R$0,01',
  }),
  usefulLife: z.string().min(1, { message: 'Campo obrigatório' }),
  formation: z.date().min(new Date(), { message: 'Data inválida' }),
  ownershipType: z.enum(['OWNED_LAND', 'LEASED_LAND'], {
    message: 'Campo obrigatório',
  }),
  growthCycle: z.enum(['ANNUAL', 'PERENNIAL'], {
    message: 'Campo obrigatório',
  }),
  observation: z.string().optional(),
})

export type ForageFormSchema = z.infer<typeof forageFormSchema>
