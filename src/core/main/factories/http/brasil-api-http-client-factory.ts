import { BrasilApiHttpClient } from '@/core/infra/http'

export const makeBrasilApiHttpClient = <
  T = unknown,
>(): BrasilApiHttpClient<T> => new BrasilApiHttpClient<T>()
