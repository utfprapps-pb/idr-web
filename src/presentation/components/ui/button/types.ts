import { ComponentPropsWithRef } from 'react'

import { VariantProps } from 'class-variance-authority'

import { buttonVariants } from './styles'

export type ButtonProps = ComponentPropsWithRef<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean
	}
