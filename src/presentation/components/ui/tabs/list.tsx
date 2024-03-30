import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { List as ListPrimitive } from '@radix-ui/react-tabs'

import { cn } from '@/main/utils'

export const List = forwardRef<
	ElementRef<typeof ListPrimitive>,
	ComponentPropsWithoutRef<typeof ListPrimitive>
>(({ className, ...props }, ref) => (
	<ListPrimitive
		ref={ref}
		className={cn(
			'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
			className
		)}
		{...props}
	/>
))

List.displayName = ListPrimitive.displayName
