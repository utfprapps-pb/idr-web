import React from 'react'

import * as S from './styles'
import { AvatarProps } from './types'

export * from './types'

export const Avatar: React.FC<AvatarProps> = ({
	src,
	size = 50,
	type = 'circle'
}) => <S.Avatar src={src} alt="user profile photo" size={size} type={type} />
