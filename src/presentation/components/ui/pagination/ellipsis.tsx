import { MoreHorizontal } from 'lucide-react'

import { cn } from '@/main/utils'

type EllipsisProps = React.ComponentProps<'span'> & {
	text?: string
}

export const Ellipsis: React.FC<EllipsisProps> = ({
	className,
	text = 'Mais páginas',
	...props
}) => (
	<span
		aria-hidden
		className={cn('flex h-9 w-9 items-center justify-center', className)}
		{...props}
	>
		<MoreHorizontal className="h-4 w-4" />
		<span className="sr-only">{text}</span>
	</span>
)

Ellipsis.displayName = 'PaginationEllipsis'
