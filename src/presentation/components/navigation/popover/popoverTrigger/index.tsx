import { PropsWithChildren } from 'react'

import * as S from './styles'

export const PopoverTrigger: React.FC<PropsWithChildren> = ({ children }) => (
	<S.PopoverTrigger>{children}</S.PopoverTrigger>
)
