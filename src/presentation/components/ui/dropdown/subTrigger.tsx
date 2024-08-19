import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { SubTrigger as SubTriggerPrimitive } from '@radix-ui/react-dropdown-menu'
import { ChevronRight } from 'lucide-react'

import { cn } from '@/shared/utils'

export const SubTrigger = forwardRef<
	ElementRef<typeof SubTriggerPrimitive>,
	ComponentPropsWithoutRef<typeof SubTriggerPrimitive> & {
		inset?: boolean
	}
>(({ className, inset, children, ...props }, ref) => (
	<SubTriggerPrimitive
		ref={ref}
		className={cn(
			'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent',
			inset && 'pl-8',
			className
		)}
		{...props}
	>
		{children}
		<ChevronRight className="ml-auto h-4 w-4" />
	</SubTriggerPrimitive>
))

SubTrigger.displayName = SubTriggerPrimitive.displayName
