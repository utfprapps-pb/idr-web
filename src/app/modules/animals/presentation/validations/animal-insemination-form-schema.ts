import { z } from 'zod'

import { optionSchema } from '@/core/validation/schemas'

export const animalInseminationFormSchema = z.object({
  date: z.date().max(new Date(), { message: 'Data inválida' }),
  sire: optionSchema.refine(({ label, value }) => label !== '' && value > 0, {
    message: 'Identificação do Animal Reprodutor é obrigatório',
  }),
})

export type AnimalInseminationFormSchema = z.infer<
  typeof animalInseminationFormSchema
>
