import { z } from 'zod'

import { optionSchema } from '@/validation/schemas'

const animalSchema = z.object({
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

type AnimalFormData = z.infer<typeof animalSchema>

export { animalSchema, type AnimalFormData }
