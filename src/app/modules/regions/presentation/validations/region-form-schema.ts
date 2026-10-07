import { z } from 'zod'

export const regionFormSchema = z.object({
  name: z.string().min(1, { message: 'Campo obrigatório' }),
})

export type RegionFormSchema = z.infer<typeof regionFormSchema>
