import { ReactElement } from 'react'

import * as S from './styles'

type TextFieldIconProps = {
	icon: ReactElement
}

export const TextFieldIcon: React.FC<TextFieldIconProps> = ({ icon }) => (
	<S.Container isClickable={!!icon?.props?.onClick}>{icon}</S.Container>
)
