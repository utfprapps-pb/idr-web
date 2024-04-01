import { forwardRef, ComponentProps } from 'react'

import { VariantProps, cva } from 'class-variance-authority'
import clsx from 'clsx'

import { cn } from '@/main/utils'

const itemVariants = cva('cursor-pointer', {
	variants: {
		isDisabled: {
			true: clsx`cursor-not-allowed opacity-50`,
			false: ''
		}
	},
	defaultVariants: {
		isDisabled: false
	}
})

type ItemProps = ComponentProps<'li'> & VariantProps<typeof itemVariants>

export const Item = forwardRef<HTMLLIElement, ItemProps>(
	({ className, isDisabled, ...props }, ref) => (
		<li
			ref={ref}
			className={cn(itemVariants({ isDisabled, className }))}
			{...props}
		/>
	)
)

Item.displayName = 'PaginationItem'
