import { z } from 'zod'

export const optionSchema = z.object({
  label: z.string().min(1, { message: 'Campo obrigatório' }),
  value: z.string().min(1, { message: 'Campo obrigatório' }),
})
