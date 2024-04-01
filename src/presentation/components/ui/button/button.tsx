import { forwardRef } from 'react'

import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/main/utils'

import { buttonVariants } from './styles'

import type { ButtonProps } from './types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)

Button.displayName = 'Button'
