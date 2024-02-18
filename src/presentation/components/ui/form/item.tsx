import { ComponentPropsWithRef, useId, useMemo } from 'react'

import { cn } from '@/main/utils'

import { FormItemContext } from './contexts'

export const Item: React.FC<ComponentPropsWithRef<'div'>> = ({
	className,
	ref,
	...props
}) => {
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

Item.displayName = 'FormItem'
