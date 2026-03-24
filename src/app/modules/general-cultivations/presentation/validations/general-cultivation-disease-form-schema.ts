import { z } from 'zod'

export const generalCultivationDiseaseFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Nome é obrigatório',
  }),
})

export type GeneralCultivationDiseaseFormSchema = z.infer<
  typeof generalCultivationDiseaseFormSchema
>
