import { z } from 'zod'

import { optionSchema } from '@/core/validation/schemas'

export const animalChildbirthFormSchema = z.object({
  date: z.date().max(new Date(), { message: 'Data inválida' }),
  gender: z.enum(['MALE', 'FEMALE'], {
    message: 'Campo obrigatório',
  }),
  weight: z.string().min(1, { message: 'Campo obrigatório' }),
  condition: z.enum(['ALIVE', 'DEAD'], {
    message: 'Campo obrigatório',
  }),
  breed: optionSchema.refine(
    ({ label, value }) => label !== '' && value !== '',
    {
      message: 'Raça é obrigatória',
    }
  ),
})

export type AnimalChildbirthFormSchema = z.infer<
  typeof animalChildbirthFormSchema
>
