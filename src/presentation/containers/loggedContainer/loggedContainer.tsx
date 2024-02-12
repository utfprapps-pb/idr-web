import { cn } from '@/main/utils'

import { styles } from './styles'

import type { LoggedContainerProps } from './types'

export const LoggedContainer: React.FC<LoggedContainerProps> = ({
	children,
	className,
	...props
}) => (
	<section
		style={styles.inline}
		className={cn(...styles.className, className)}
		{...props}
	>
		{children}
	</section>
)
