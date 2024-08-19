import { cn } from '@/shared/utils'

export const Footer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}) => (
	<div
		className={cn(
			'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
			className
		)}
		{...props}
	/>
)

Footer.displayName = 'DialogFooter'
