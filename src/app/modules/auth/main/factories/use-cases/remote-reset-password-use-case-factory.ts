import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteResetPasswordUseCase } from '../../../data/use-cases'

import type { ResetPasswordUseCase } from '../../../domain/use-cases'

export function makeRemoteResetPasswordUseCase(): ResetPasswordUseCase {
  return new RemoteResetPasswordUseCase(
    'v1/email/reset-password',
    makeApiHttpClient<void>()
  )
}
