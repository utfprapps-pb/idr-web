import { z } from 'zod'

export const inputUseLocationFormSchema = z.object({
  description: z
    .string()
    .min(3, 'A descrição deve ter no mínimo 3 caracteres')
    .max(255, 'A descrição deve ter no máximo 255 caracteres'),
})

export type InputUseLocationFormSchema = z.infer<
  typeof inputUseLocationFormSchema
>
