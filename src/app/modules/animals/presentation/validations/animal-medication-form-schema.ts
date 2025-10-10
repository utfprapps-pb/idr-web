import { z } from 'zod'

import { optionSchema } from '@/core/validation/schemas'

export const animalMedicationFormSchema = z.object({
  date: z.date().max(new Date(), { message: 'Data inválida' }),
  product: optionSchema.refine(
    ({ label, value }) => label !== '' && value > 0,
    {
      message: 'Produto é obrigatório',
    }
  ),
  activeIngredient: optionSchema.refine(
    ({ label, value }) => label !== '' && value > 0,
    {
      message: 'Princípio ativo é obrigatório',
    }
  ),
  appliedDose: z.string().min(1, { message: 'Campo obrigatório' }),
  applicationMethod: z.enum(['IM', 'IV', 'SC', 'IntraMammary', 'PourOn'], {
    message: 'Campo obrigatório',
  }),
})

export type AnimalMedicationFormSchema = z.infer<
  typeof animalMedicationFormSchema
>
