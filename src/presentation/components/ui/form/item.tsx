import { HTMLAttributes, forwardRef, useId, useMemo } from 'react'

import { cn } from '@/shared/utils'

import { FormItemContext } from './contexts'

export const Item = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const id = useId()

		const providerProps = useMemo(
			() => ({
				id
			}),
			[id]
		)

		return (
			<FormItemContext.Provider value={providerProps}>
				<div ref={ref} className={cn('space-y-2', className)} {...props} />
			</FormItemContext.Provider>
		)
	}
)

Item.displayName = 'FormItem'
