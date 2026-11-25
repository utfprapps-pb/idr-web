import { z } from 'zod'

import { requiredDateSchema } from '@/core/validation/schemas'

export const animalDeathFormSchema = z.object({
  date: requiredDateSchema('Data do óbito é obrigatória'),
  reason: z.string().min(1, {
    message: 'Causa do óbito é obrigatória',
  }),
})

export type AnimalDeathFormSchema = z.infer<typeof animalDeathFormSchema>
