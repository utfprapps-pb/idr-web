import type { RequestInterface } from '@/core/domain/types'

export type RequestPasswordRecoveryParams = {
  email: string
}

export type RequestPasswordRecoveryUseCase = RequestInterface<
  RequestPasswordRecoveryParams,
  void
>
