import { ApiHttpClient } from '@/infra/http'

export const makeApiHttpClient = <TBody = unknown>(): ApiHttpClient<TBody> =>
	new ApiHttpClient<TBody>()
