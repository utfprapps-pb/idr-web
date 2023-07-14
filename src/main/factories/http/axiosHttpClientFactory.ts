import { AxiosHttpClient } from '@/infra/http'

export const makeAxiosHttpClient = <T = unknown>(): AxiosHttpClient<T> =>
	new AxiosHttpClient<T>()
