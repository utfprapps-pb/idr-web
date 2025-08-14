import { BrasilApiHttpClient } from '@/core/infra/http'

export const makeBrasilApiHttpClient = <
  TModel = unknown,
  TApiModel = unknown,
  TApiResponse = TApiModel,
>(): BrasilApiHttpClient<TModel, TApiModel, TApiResponse> =>
  new BrasilApiHttpClient<TModel, TApiModel, TApiResponse>()
