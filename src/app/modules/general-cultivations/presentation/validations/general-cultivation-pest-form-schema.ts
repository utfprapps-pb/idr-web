import { z } from 'zod'

export const generalCultivationPestFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Nome é obrigatório',
  }),
})

export type GeneralCultivationPestFormSchema = z.infer<
  typeof generalCultivationPestFormSchema
>
