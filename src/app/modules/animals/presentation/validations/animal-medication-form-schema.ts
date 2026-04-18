import { z } from 'zod'

import { createOptionSchemaWithExtraData } from '@/core/validation/schemas'

export const animalMedicationFormSchema = z.object({
  date: z.date().max(new Date(), { message: 'Data inválida' }),
  product: createOptionSchemaWithExtraData({
    activeIngredient: z.string(),
  }).refine(({ label, value }) => label !== '' && value > 0, {
    message: 'Produto é obrigatório',
  }),
  appliedDose: z.string().min(1, { message: 'Campo obrigatório' }),
  applicationMethod: z.enum(['IM', 'IV', 'SC', 'IntraMammary', 'PourOn'], {
    message: 'Campo obrigatório',
  }),
})

export type AnimalMedicationFormSchema = z.infer<
  typeof animalMedicationFormSchema
>
