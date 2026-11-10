import { z } from 'zod'

import { optionStringSchema } from '@/core/validation/schemas'

export const animalFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Nome é obrigatório',
  }),
  breed: optionStringSchema.refine(
    ({ label, value }) => label !== '' && value !== '',
    {
      message: 'Raça é obrigatória',
    }
  ),
})

export type AnimalFormSchema = z.infer<typeof animalFormSchema>
