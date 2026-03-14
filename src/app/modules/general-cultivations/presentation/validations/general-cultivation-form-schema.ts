import { z } from 'zod'

import { percentValidation } from '@/core/validation/validators'

const percentField = z.string().refine((value) => percentValidation(value), {
  message: 'Valor de 0,01% a 100%',
})

export const generalCultivationFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Nome é obrigatório',
  }),
  type: z.enum(['FORAGE', 'CONCENTRATE', 'MINERAL'], {
    message: 'Tipo é obrigatório',
  }),
  dryMatter: percentField,
  crudeProtein: percentField,
  totalDigestibleNutrients: percentField,
  calcium: percentField,
  phosphorus: percentField,
  nonFibrousCarbohydrates: percentField,
  etherExtract: percentField,
  rumenDegradableProtein: percentField,
})

export type GeneralCultivationFormSchema = z.infer<
  typeof generalCultivationFormSchema
>
