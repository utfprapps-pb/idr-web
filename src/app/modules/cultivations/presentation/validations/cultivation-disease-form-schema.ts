import { z } from 'zod'

import { optionSchema } from '@/core/validation/schemas'

export const cultivationDiseaseFormSchema = z.object({
  cultivation: optionSchema.refine(
    ({ label, value }) => label !== '' && value > 0,
    {
      message: 'Vegetal é obrigatório',
    }
  ),
  disease: optionSchema.refine(
    ({ label, value }) => label !== '' && value > 0,
    {
      message: 'Doença é obrigatória',
    }
  ),
  infestationType: z.enum(['LOW', 'MEDIUM', 'HIGH'], {
    required_error: 'Tipo de infestação é obrigatório',
  }),
})

export type CultivationDiseaseFormSchema = z.infer<
  typeof cultivationDiseaseFormSchema
>
