import type { RequestInterface } from '@/core/domain/types'

export type ValidatePasswordRecoveryCodeParams = {
  email: string
  recoveryCode: string
}

export type ValidatePasswordRecoveryCodeUseCase = RequestInterface<
  ValidatePasswordRecoveryCodeParams,
  void
>
