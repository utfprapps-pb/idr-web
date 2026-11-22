import { z } from 'zod'

import {
  requiredDateSchema,
  requiredEnumSchema,
} from '@/core/validation/schemas'

const cmtResultsEnum = requiredEnumSchema(
  ['PLUS-ONE', 'PLUS-TWO', 'PLUS-THREE', 'ABSENT'],
  'Campo obrigatório'
)

export const animalMastitisFormSchema = z.object({
  date: requiredDateSchema('Data do diagnóstico é obrigatória'),
  type: requiredEnumSchema(['CLINICAL', 'SUBCLINICAL'], 'Campo obrigatório'),
  ad: cmtResultsEnum,
  ae: cmtResultsEnum,
  pd: cmtResultsEnum,
  pe: cmtResultsEnum,
})

export type AnimalMastitisFormSchema = z.infer<typeof animalMastitisFormSchema>
