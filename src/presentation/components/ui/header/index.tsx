import React from 'react'

import * as S from './styles'
import { HeaderProps } from './types'
import { Text } from '../text'
import { Popover } from '@/presentation/components/navigation'

export * from './types'

export const Header: React.FC<HeaderProps> = ({ items }) => (
	<S.Header>
		<S.UserContent>
			<S.UserPhoto src="https://github.com/minozzzi.png" />
			<Text size="b2" color="text">
				Guilherme Minozzi
			</Text>
			<Popover items={items} />
		</S.UserContent>
	</S.Header>
)
