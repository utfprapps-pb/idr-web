import { z } from 'zod'

export const inputUseActiveIngredientFormSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(255, 'O nome deve ter no máximo 255 caracteres'),
})

export type InputUseActiveIngredientFormSchema = z.infer<
  typeof inputUseActiveIngredientFormSchema
>
