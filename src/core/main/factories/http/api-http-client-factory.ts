import { ApiHttpClient } from '@/core/infra/http'

export function makeApiHttpClient<TBody = unknown>(): ApiHttpClient<TBody> {
  return new ApiHttpClient<TBody>()
}
