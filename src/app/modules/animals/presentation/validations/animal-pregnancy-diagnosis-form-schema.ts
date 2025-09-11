import { z } from 'zod'

export const animalPregnancyDiagnosisFormSchema = z.object({
  date: z
    .date({
      required_error: 'Data do diagnóstico é obrigatória',
    })
    .max(new Date(), { message: 'Data inválida' }),
  lastInseminationDate: z
    .date({
      required_error: 'Data da última inseminação é obrigatória',
    })
    .max(new Date(), { message: 'Data inválida' }),
})

export type AnimalPregnancyDiagnosisFormSchema = z.infer<
  typeof animalPregnancyDiagnosisFormSchema
>
