import React, { Children } from 'react'

import * as S from './styles'
import { InputGroupProps } from './types'

export * from './types'

export const InputGroup: React.FC<InputGroupProps> = ({ children }) => (
	<S.Container childrenLength={Children.count(children)}>
		{children}
	</S.Container>
)
