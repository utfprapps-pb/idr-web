import { cn } from '@/shared/utils'

export const Shortcut: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({
	className,
	...props
}) => (
	<span
		className={cn(
			'ml-auto text-xs tracking-widest text-muted-foreground',
			className
		)}
		{...props}
	/>
)

Shortcut.displayName = 'CommandShortcut'
