import React from 'react'

import { DesignSystemMapperProps, TextProps } from './types'
import { Typography } from '../typography'

export * from './types'

const DesignSystemMapper: DesignSystemMapperProps = {
	b1: {
		weight: 'regular'
	},
	b2: {
		weight: 'regular'
	},
	b3: {
		weight: 'light'
	},
	b4: {
		weight: 'light'
	},
	h1: {
		weight: 'bold'
	},
	h2: {
		weight: 'bold'
	},
	h3: {
		weight: 'bold'
	},
	h4: {
		weight: 'bold'
	},

	h5: {
		weight: 'bold'
	}
}

export const Text: React.FC<TextProps> = ({
	size,
	color,
	fontFamily,
	className,
	styles,
	onClick,

	children
}) => {
	const { weight } = DesignSystemMapper[size]

	return (
		<Typography
			size={size}
			weight={weight}
			family={fontFamily}
			color={color}
			className={className}
			styles={styles}
			onClick={onClick}
		>
			{children}
		</Typography>
	)
}
