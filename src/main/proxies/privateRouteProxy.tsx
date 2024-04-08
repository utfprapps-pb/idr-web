import { PropsWithChildren } from 'react'

import { Navigate } from 'react-router-dom'

import { PAGE_PATHS } from '@/main/routes/paths'
import { LoggedContainer } from '@/presentation/containers'
import { useAuth } from '@/presentation/store'

export const PrivateRouteProxy: React.FC<PropsWithChildren> = ({
	children
}) => {
	const { auth } = useAuth()

	if (auth?.token) return <LoggedContainer>{children}</LoggedContainer>

	return <Navigate to={PAGE_PATHS.login} />
}
