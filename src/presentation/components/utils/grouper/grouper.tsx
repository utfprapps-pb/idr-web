import { Children } from 'react'

import { cn } from '@/main/utils'

import { styles } from './styles'

import type { GrouperProps } from './types'

const Grouper: React.FC<GrouperProps> = ({ children, className, ...props }) => {
	const gridCols = Children.count(children)

	return (
		<section
			style={{
				gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`
			}}
			className={cn(...styles, className)}
			{...props}
		>
			{children}
		</section>
	)
}

export { Grouper }
