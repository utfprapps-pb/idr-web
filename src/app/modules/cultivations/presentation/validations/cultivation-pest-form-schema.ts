import { z } from 'zod'

import { optionSchema } from '@/core/validation/schemas'

export const cultivationPestFormSchema = z.object({
  cultivation: optionSchema.refine(
    ({ label, value }) => label !== '' && value > 0,
    {
      message: 'Cultivo é obrigatório',
    }
  ),
  pest: optionSchema.refine(({ label, value }) => label !== '' && value > 0, {
    message: 'Praga é obrigatória',
  }),
  infestationType: z.enum(['LOW', 'MEDIUM', 'HIGH'], {
    required_error: 'Tipo de infestação é obrigatório',
  }),
})

export type CultivationPestFormSchema = z.infer<
  typeof cultivationPestFormSchema
>
