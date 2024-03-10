import { Children } from 'react'

import { cn } from '@/main/utils'
import { useWindowResize } from '@/presentation/hooks/useWindowResize'

import { styles } from './styles'

import type { GrouperProps } from './types'

const Grouper: React.FC<GrouperProps> = ({ children, className, ...props }) => {
	const { width } = useWindowResize()

	const gridCols = width >= 640 ? Children.count(children) : 1

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
