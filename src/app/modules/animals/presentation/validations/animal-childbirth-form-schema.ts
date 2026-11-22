import { z } from 'zod'

import {
  optionStringSchema,
  requiredDateSchema,
  requiredEnumSchema,
} from '@/core/validation/schemas'

export const animalChildbirthFormSchema = z.object({
  date: requiredDateSchema('Data do parto é obrigatória'),
  gender: requiredEnumSchema(['MALE', 'FEMALE'], 'Campo obrigatório'),
  weight: z.string().min(1, { message: 'Campo obrigatório' }),
  condition: requiredEnumSchema(['ALIVE', 'DEAD'], 'Campo obrigatório'),
  breed: optionStringSchema.refine(
    ({ label, value }) => label !== '' && value !== '',
    {
      message: 'Raça é obrigatória',
    }
  ),
  // Opcional: `value: ''` quando o bezerro não faz parte do rebanho.
  calf: z.object({ label: z.string(), value: z.string() }),
})

export type AnimalChildbirthFormSchema = z.infer<
  typeof animalChildbirthFormSchema
>
