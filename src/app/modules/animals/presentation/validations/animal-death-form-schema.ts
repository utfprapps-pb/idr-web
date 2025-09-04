import { z } from 'zod'

export const animalDeathFormSchema = z.object({
  date: z
    .date({
      required_error: 'Data do óbito é obrigatória',
    })
    .max(new Date(), { message: 'Data inválida' }),
  reason: z.string().min(1, {
    message: 'Razão é da morte é obrigatória',
  }),
})

export type AnimalDeathFormSchema = z.infer<typeof animalDeathFormSchema>
