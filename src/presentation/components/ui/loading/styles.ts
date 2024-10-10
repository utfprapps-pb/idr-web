import { cva } from 'class-variance-authority'
import clsx from 'clsx'

const baseStyles = clsx`w-5 h-5 text-gray-200 animate-spin fill-secondary-600`

const variants = {
	size: {
		default: clsx`w-5 h-5`,
		sm: clsx`w-4 h-4`,
		lg: clsx`w-6 h-6`,
	},
}

export const loadingVariants = cva(baseStyles, {
	variants,
	defaultVariants: {
		size: 'default',
	},
})
