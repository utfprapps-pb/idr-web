import { LocalStorageAdapter } from '@/infra/cache'

import type { InternalAxiosRequestConfig } from 'axios'

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
