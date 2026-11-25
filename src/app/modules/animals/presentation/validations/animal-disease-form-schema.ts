import { z } from 'zod'

import { requiredDateSchema } from '@/core/validation/schemas'

export const animalDiseaseFormSchema = z.object({
  diagnosticDate: requiredDateSchema('Data do diagnóstico é obrigatória'),
  diagnostic: z.string().min(1, {
    message: 'Diagnóstico é obrigatório',
  }),
})

export type AnimalDiseaseFormSchema = z.infer<typeof animalDiseaseFormSchema>
