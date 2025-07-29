import { z } from 'zod'

export const animalDiseaseFormSchema = z.object({
  diagnosticDate: z
    .date({
      required_error: 'Data do diagnóstico é obrigatória',
    })
    .max(new Date(), { message: 'Data inválida' }),
  diagnostic: z.string().min(1, {
    message: 'Diagnóstico é obrigatório',
  }),
})

export type AnimalDiseaseFormSchema = z.infer<typeof animalDiseaseFormSchema>
