import { z } from 'zod'

export const animalInseminationFormSchema = z.object({
  date: z.date().max(new Date(), { message: 'Data inválida' }),
  sire: z.string().min(1, { message: 'Touro é obrigatório' }),
})

export type AnimalInseminationFormSchema = z.infer<
  typeof animalInseminationFormSchema
>
