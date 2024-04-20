import { cn } from '@/main/utils'

export const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}) => (
	<div
		className={cn(
			'flex flex-col space-y-1.5 text-center sm:text-left',
			className
		)}
		{...props}
	/>
)

Header.displayName = 'DialogHeader'
