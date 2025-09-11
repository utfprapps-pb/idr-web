import type { WithId } from '../types'

export type UserModel = WithId<{
  name: string
}>

export type UserApiResponse = WithId<{
  displayName: string
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
  city: string
  houseNumber?: string
}
