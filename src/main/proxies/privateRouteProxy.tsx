import { PropsWithChildren } from 'react'

import { Navigate } from 'react-router-dom'

import { LoggedContainer } from '@/presentation/containers'
import { useAuth } from '@/presentation/store'

import { PAGE_PATHS } from '../routes/paths'

export const PrivateRouteProxy: React.FC<PropsWithChildren> = ({
	children
}) => {
	const { auth } = useAuth()

	if (auth?.token) return <LoggedContainer>{children}</LoggedContainer>

	return <Navigate to={PAGE_PATHS.login} />
}
