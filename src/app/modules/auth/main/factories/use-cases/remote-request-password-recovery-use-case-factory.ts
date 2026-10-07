import { makeApiHttpClient } from '@/core/main/factories/http'

import { RemoteRequestPasswordRecoveryUseCase } from '../../../data/use-cases'

import type { RequestPasswordRecoveryUseCase } from '../../../domain/use-cases'

export function makeRemoteRequestPasswordRecoveryUseCase(): RequestPasswordRecoveryUseCase {
  return new RemoteRequestPasswordRecoveryUseCase(
    'v1/email/send-recuperation-code',
    makeApiHttpClient<void>()
  )
}
