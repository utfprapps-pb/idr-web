import type { RequestInterface } from '@/core/domain/types'

export type ResetPasswordParams = {
  email: string
  recoveryCode: string
  newPassword: string
  confirmPassword: string
}

export type ResetPasswordUseCase = RequestInterface<ResetPasswordParams, void>
