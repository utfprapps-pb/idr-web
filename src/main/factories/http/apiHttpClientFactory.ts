import { ApiHttpClient } from '@/infra/http'

export const makeApiHttpClient = <T = unknown>(): ApiHttpClient<T> =>
	new ApiHttpClient<T>()
