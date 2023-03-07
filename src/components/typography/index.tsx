import React from 'react'

import * as S from './styles'
import { TypographyProps } from './types'

export * from './types'

export const Typography: React.FC<TypographyProps> = ({
	children,
	color = 'white',
	weight = 'regular',
	size = 'b1',
	family = 'primary',
	className,
	onClick
}) => {
	const headingRegex = /^h[1-6]$/
	const isHeading = headingRegex.test(size)

	return (
		<S.Text
			as={isHeading ? size : `p`}
			color={color}
			weight={weight}
			size={size}
			family={family}
			className={className}
			onClick={onClick}
			hasOnClick={!!onClick}
		>
			{children}
		</S.Text>
	)
}
