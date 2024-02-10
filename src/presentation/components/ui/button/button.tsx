import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/main/utils'

import { buttonVariants } from './styles'

import type { ButtonProps } from './types'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ className, size, variant }))}
				ref={ref}
				{...props}
			/>
		)
	}
)

Button.displayName = 'Button'
export { Button }
