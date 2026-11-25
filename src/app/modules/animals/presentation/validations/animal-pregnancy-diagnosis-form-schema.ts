import { z } from 'zod'

import { requiredDateSchema } from '@/core/validation/schemas'

export const animalPregnancyDiagnosisFormSchema = z.object({
  date: requiredDateSchema('Data do diagnóstico é obrigatória'),
  lastInseminationDate: requiredDateSchema(
    'Data da última inseminação é obrigatória'
  ),
})

export type AnimalPregnancyDiagnosisFormSchema = z.infer<
  typeof animalPregnancyDiagnosisFormSchema
>
