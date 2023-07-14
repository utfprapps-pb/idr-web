import { PropsWithChildren } from 'react'

import { Portal } from '@radix-ui/react-popover'

import * as S from './styles'

export const PopoverContent: React.FC<PropsWithChildren> = ({ children }) => (
	<Portal>
		<S.PopoverContent sideOffset={4}>{children}</S.PopoverContent>
	</Portal>
)
