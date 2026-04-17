import { z } from 'zod'

import { optionSchema } from '@/core/validation/schemas'

export const inputUseProductFormSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .max(255, 'O nome deve ter no máximo 255 caracteres'),
  category: optionSchema.refine(
    ({ label, value }) => label !== '' && value !== 0,
    {
      message: 'Categoria é obrigatória',
    }
  ),
  activeIngredient: optionSchema.refine(
    ({ label, value }) => label !== '' && value !== 0,
    {
      message: 'Princípio ativo é obrigatório',
    }
  ),
})

export type InputUseProductFormSchema = z.infer<
  typeof inputUseProductFormSchema
>
