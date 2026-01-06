import { z } from 'zod'

export const generalCultivationFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Nome é obrigatório',
  }),
  type: z.enum(['FORAGE', 'CONCENTRATE', 'MINERAL'], {
    message: 'Tipo é obrigatório',
  }),
})

export type GeneralCultivationFormSchema = z.infer<
  typeof generalCultivationFormSchema
>
