import { ComponentPropsWithRef } from 'react'

import { cn } from '@/main/utils'

import { useFormField } from './hooks/useFormField'

export const Message: React.FC<ComponentPropsWithRef<'p'>> = ({
	className,
	children,
	ref,
	...props
}) => {
	const { error, formMessageId } = useFormField()
	const body = error ? String(error?.message) : children

	if (!body) {
		return null
	}

	return (
		<p
			ref={ref}
			id={formMessageId}
			className={cn('text-sm font-medium text-destructive', className)}
			{...props}
		>
			{body}
		</p>
	)
}

Message.displayName = 'FormMessage'
