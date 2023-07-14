import React from 'react'

import * as S from './styles'
import { LoggedContainerProps } from './types'

export const LoggedContainer: React.FC<LoggedContainerProps> = ({
	children
}) => <S.Content>{children}</S.Content>
