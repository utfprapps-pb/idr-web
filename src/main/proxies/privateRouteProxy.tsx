import { PropsWithChildren } from 'react'

import { Navigate } from 'react-router-dom'

import { LocalStorageAdapter } from '@/infra/cache'
import { PAGE_PATHS } from '@/main/routes/paths'
import { LoggedContainer } from '@/presentation/containers'

export const PrivateRouteProxy: React.FC<PropsWithChildren> = ({
	children,
}) => {
	const token = LocalStorageAdapter.get(
		LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH
	)
	if (token) return <LoggedContainer>{children}</LoggedContainer>

	return <Navigate to={PAGE_PATHS.login} />
}
