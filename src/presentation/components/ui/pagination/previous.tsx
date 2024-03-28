import { ComponentProps } from 'react'

import { ChevronLeft } from 'lucide-react'

import { cn } from '@/main/utils'

import { Link } from './link'

type PreviousProps = ComponentProps<typeof Link> & {
	text?: string
}

export const Previous: React.FC<PreviousProps> = ({
	className,
	text = 'Anterior',
	...props
}) => (
	<Link
		aria-label="Vai para página anterior"
		size="default"
		className={cn('gap-1 pl-2.5', className)}
		{...props}
	>
		<ChevronLeft className="h-4 w-4" />
		<span>{text}</span>
	</Link>
)

Previous.displayName = 'PaginationPrevious'
