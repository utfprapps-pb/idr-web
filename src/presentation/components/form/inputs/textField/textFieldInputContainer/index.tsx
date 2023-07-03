import { PropsWithChildren } from 'react'

import * as S from './styles'

export const TextFieldInputContainer: React.FC<PropsWithChildren> = ({
	children
}) => <S.Container>{children}</S.Container>
