import { cva } from 'class-variance-authority'
import clsx from 'clsx'

const baseStyles = clsx`
inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
`

const variants = {
	variant: {
		default: clsx`bg-primary-500 text-white hover:bg-primary-600`,
		destructive: clsx`bg-destructive text-white hover:bg-red-600`,
		other: clsx`bg-`,
		outline: clsx`border border-input bg-white hover:bg-accent hover:text-accent-foreground`,
		secondary: clsx`bg-secondary-500 text-white hover:bg-secondary-600`,
		ghost: clsx`hover:bg-accent hover:text-accent-foreground`,
		link: clsx`text-primary underline-offset-4 hover:underline`
	},
	size: {
		default: clsx`h-10 px-4 py-2`,
		sm: clsx`h-9 rounded-md px-3`,
		lg: clsx`h-11 rounded-md px-8`,
		icon: clsx`h-10 w-10`,
		link: clsx`h-auto p-0 `
	}
}

export const buttonVariants = cva(baseStyles, {
	variants,
	defaultVariants: {
		variant: 'default',
		size: 'default'
	}
})
