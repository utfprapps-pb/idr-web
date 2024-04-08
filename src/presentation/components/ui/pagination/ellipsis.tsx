import { MoreHorizontal } from 'lucide-react'

import { cn } from '@/main/utils'

export const Ellipsis: React.FC<React.ComponentProps<'span'>> = ({
	className,
	...props
}) => (
	<span
		aria-hidden
		className={cn(
			'flex h-9 w-9 items-center justify-center cursor-default',
			className
		)}
		{...props}
	>
		<MoreHorizontal size={16} />
	</span>
)

Ellipsis.displayName = 'PaginationEllipsis'
