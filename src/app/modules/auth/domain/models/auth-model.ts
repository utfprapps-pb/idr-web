import type { Option } from '@/core/domain/types'

export type AuthModel = {
  accessToken: string
  refreshToken: string
}

export type AuthApiResponse = {
  accessToken: string
  refreshToken: string
}

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
