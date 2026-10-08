import { z } from 'zod'

import { optionStringSchema } from '@/core/validation/schemas'

export const animalInseminationFormSchema = z.object({
  date: z.date().max(new Date(), { message: 'Data inválida' }),
  sire: optionStringSchema.refine(
    ({ label, value }) => label !== '' && value !== '',
    {
      message: 'Animal Reprodutor é obrigatório',
    }
  ),
})

export type AnimalInseminationFormSchema = z.infer<
  typeof animalInseminationFormSchema
>
