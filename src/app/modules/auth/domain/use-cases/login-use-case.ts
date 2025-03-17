import type { AuthModel } from '../models/auth-model'
import type { RequestInterface } from '@/core/domain/types'

export type LoginParams = {
  email: string
  password: string
}

export type LoginUseCase = RequestInterface<LoginParams, AuthModel>
