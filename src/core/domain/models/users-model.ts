import type { Option, WithId } from '../types'

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

export type CreateUserModel = {
  name: string
  email: string
  password: string
  confirmPassword: string
  cpf: string
  phone: string
  graduationYear: string
  professionalRegister: string
  cep: string
  street: string
  cityId: Option<string>
  houseNumber?: string
}
