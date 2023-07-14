import React from 'react'

import * as S from './styles'
import { AvatarProps } from './types'

export * from './types'

export const Avatar: React.FC<AvatarProps> = ({
	size = 50,
	type = 'circle',
	...props
}) => <S.Avatar size={size} type={type} {...props} />
