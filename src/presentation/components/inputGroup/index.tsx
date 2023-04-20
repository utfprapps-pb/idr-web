import React, { Children, PropsWithChildren } from 'react'

import * as S from './styles'

type InputGroupProps = PropsWithChildren
export const InputGroup: React.FC<InputGroupProps> = ({ children }) => (
	<S.Container childrenLength={Children.count(children)}>
		{children}
	</S.Container>
)
