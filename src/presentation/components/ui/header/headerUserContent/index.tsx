import { PropsWithChildren } from 'react'

import * as S from './styles'

export const HeaderUserContent: React.FC<PropsWithChildren> = ({
	children
}) => <S.UserContent>{children}</S.UserContent>
