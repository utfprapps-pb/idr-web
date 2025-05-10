import { ApiHttpClient } from '@/core/infra/http'

export function makeApiHttpClient<
  TModel = unknown,
  TApiModel = unknown,
>(): ApiHttpClient<TModel, TApiModel> {
  return new ApiHttpClient<TModel, TApiModel>()
}
