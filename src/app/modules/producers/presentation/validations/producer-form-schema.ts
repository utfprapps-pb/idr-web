import { z } from 'zod'

export const producerFormSchema = z.object({
  name: z.string().min(1, { message: 'Nome do produtor é obrigatório' }),
  cpf: z
    .string()
    .min(1, { message: 'CPF é obrigatório' })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: 'CPF inválido' }),
})

export type ProducerFormSchema = z.infer<typeof producerFormSchema>
