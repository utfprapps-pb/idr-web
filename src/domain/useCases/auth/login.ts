import { AuthModel } from '@/domain/models/authModel'

import type { IRequestInterface } from '@/domain/shared/types'

export type LoginParams = {
  email: string
  password: string
}

export type ILogin = IRequestInterface<LoginParams, AuthModel>
