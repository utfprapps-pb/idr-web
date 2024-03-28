import React from 'react'

import { cn } from '@/main/utils'

import { itemVariants } from './styles'
import { ItemProps } from './types'

export const Item = React.forwardRef<HTMLDivElement, ItemProps>(
	({ className, active, ...props }, ref) => (
		<div
			ref={ref}
			className={cn(itemVariants({ active, className }))}
			{...props}
		/>
	)
)

Item.displayName = 'SidebarItem'
