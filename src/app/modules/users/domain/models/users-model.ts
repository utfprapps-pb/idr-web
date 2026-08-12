import type { WithId } from '@/core/domain/types'

export const ADMIN_ROLE = 'ADMIN'

export type UserRole =
  | 'ADMIN'
  | 'COORDENACAO_GERAL'
  | 'GERENCIA_MACRO'
  | 'GERENCIA_REGIONAL'
  | 'GERENCIA_MUNICIPAL'
  | 'TECNICO'

export type UserModel = WithId<{
  name: string
  role?: UserRole
}>

export type UserApiResponse = WithId<{
  displayName: string
  role?: string
}>
