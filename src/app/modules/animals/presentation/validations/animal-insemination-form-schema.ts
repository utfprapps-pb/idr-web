import { z } from 'zod'

import { notFutureDateValidation } from '@/core/validation/validators'

export const animalInseminationFormSchema = z.object({
  date: z.date().refine(notFutureDateValidation, { message: 'Data inválida' }),
  sire: z.string().min(1, { message: 'Touro é obrigatório' }),
})

export type AnimalInseminationFormSchema = z.infer<
  typeof animalInseminationFormSchema
>
