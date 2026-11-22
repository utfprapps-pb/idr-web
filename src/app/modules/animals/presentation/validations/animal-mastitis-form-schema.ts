import { z } from 'zod'

import { requiredDateSchema } from '@/core/validation/schemas'

const cmtResultsEnum = z.enum(
  ['PLUS-ONE', 'PLUS-TWO', 'PLUS-THREE', 'ABSENT'],
  {
    message: 'Campo obrigatório',
  }
)

export const animalMastitisFormSchema = z.object({
  date: requiredDateSchema('Data do diagnóstico é obrigatória'),
  type: z.enum(['CLINICAL', 'SUBCLINICAL'], {
    message: 'Campo obrigatório',
  }),
  ad: cmtResultsEnum,
  ae: cmtResultsEnum,
  pd: cmtResultsEnum,
  pe: cmtResultsEnum,
})

export type AnimalMastitisFormSchema = z.infer<typeof animalMastitisFormSchema>
