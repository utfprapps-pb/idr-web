import { cn } from '@/shared/utils'

export const Shortcut = ({
	className,
	...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
	<span
		className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
		{...props}
	/>
)

Shortcut.displayName = 'DropdownMenuShortcut'
