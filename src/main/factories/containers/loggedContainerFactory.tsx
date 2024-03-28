import { PropsWithChildren } from 'react'

import { LoggedContainer } from '@/presentation/containers'

export const MakeLoggedContainer: React.FC<PropsWithChildren> = ({
	children
}) => <LoggedContainer>{children}</LoggedContainer>
