import { PropsWithChildren } from 'react'

import { Navigate } from 'react-router-dom'

import { useAuth } from '@/presentation/store'

import { MakeLoggedContainer } from '../factories/containers'
import { PAGE_PATHS } from '../routes/paths'

export const PrivateRouteProxy: React.FC<PropsWithChildren> = ({
	children
}) => {
	const { auth } = useAuth()

	if (auth?.token) return <MakeLoggedContainer>{children}</MakeLoggedContainer>

	return <Navigate to={PAGE_PATHS.login} />
}
