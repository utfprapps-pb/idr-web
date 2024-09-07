import { HttpStatusCode } from '@/data/protocols/http'
import { LocalStorageAdapter } from '@/infra/cache'

import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

export async function authInterceptorRequest(
	config: InternalAxiosRequestConfig
) {
	const accessToken = LocalStorageAdapter.get(
		LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH
	)

	if (accessToken) {
		Object.assign(config.headers, {
			Authorization: `Bearer ${accessToken}`
		})
	}

	return config
}

export async function authInterceptorResponseError(error: AxiosError) {
	const { response } = error

	if (response?.status === HttpStatusCode.unauthorized) {
		LocalStorageAdapter.set(LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH)
	}

	return Promise.reject(error)
}
