import { z } from 'zod'

const cmtResultsEnum = z.enum(
  ['PLUS-ONE', 'PLUS-TWO', 'PLUS-THREE', 'ABSENT'],
  {
    message: 'Campo obrigatório',
  }
)

export const animalMastitisFormSchema = z.object({
  date: z.date().max(new Date(), { message: 'Data inválida' }),
  type: z.enum(['CLINICAL', 'SUBCLINICAL'], {
    message: 'Campo obrigatório',
  }),
  ad: cmtResultsEnum,
  ae: cmtResultsEnum,
  pd: cmtResultsEnum,
  pe: cmtResultsEnum,
})

export type AnimalMastitisFormSchema = z.infer<typeof animalMastitisFormSchema>
