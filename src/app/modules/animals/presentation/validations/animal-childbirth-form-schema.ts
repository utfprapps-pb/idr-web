import { z } from 'zod'

import { optionStringSchema } from '@/core/validation/schemas'

export const animalChildbirthFormSchema = z.object({
  date: z.date().max(new Date(), { message: 'Data inválida' }),
  gender: z.enum(['MALE', 'FEMALE'], {
    message: 'Campo obrigatório',
  }),
  weight: z.string().min(1, { message: 'Campo obrigatório' }),
  condition: z.enum(['ALIVE', 'DEAD'], {
    message: 'Campo obrigatório',
  }),
  breed: optionStringSchema.refine(
    ({ label, value }) => label !== '' && value !== '',
    {
      message: 'Raça é obrigatória',
    }
  ),
  // Opcional: `value: ''` quando o bezerro não faz parte do rebanho.
  calf: optionStringSchema,
})

export type AnimalChildbirthFormSchema = z.infer<
  typeof animalChildbirthFormSchema
>
