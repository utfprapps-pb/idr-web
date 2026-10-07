import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteValidatePasswordRecoveryCodeUseCase } from '../../../data/use-cases'

import type { ValidatePasswordRecoveryCodeUseCase } from '../../../domain/use-cases'

export function makeRemoteValidatePasswordRecoveryCodeUseCase(): ValidatePasswordRecoveryCodeUseCase {
  return new RemoteValidatePasswordRecoveryCodeUseCase(
    'v1/email/validate-recuperation-code',
    makeApiHttpClient<void>()
  )
}
