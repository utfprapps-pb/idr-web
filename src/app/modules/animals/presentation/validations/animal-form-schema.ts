import { z } from 'zod'

import { optionSchema } from '@/core/validation/schemas'

export const animalFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Nome é obrigatório',
  }),
  breed: optionSchema.refine(
    ({ label, value }) => label !== '' && value !== '',
    {
      message: 'Raça é obrigatória',
    }
  ),
})

export type AnimalFormSchema = z.infer<typeof animalFormSchema>
