import { z } from 'zod'

const USER_ROLES = [
  'ADMIN',
  'COORDENACAO_GERAL',
  'GERENCIA_MACRO',
  'GERENCIA_REGIONAL',
  'GERENCIA_MUNICIPAL',
  'TECNICO',
] as const

export const userPermissionsFormSchema = z.object({
  role: z.enum(USER_ROLES, { message: 'Campo obrigatório' }),
  readOnly: z.boolean().default(false),
  regionIds: z.array(z.string()).default([]),
  cityIds: z.array(z.string()).default([]),
})

export type UserPermissionsFormSchema = z.infer<
  typeof userPermissionsFormSchema
>
