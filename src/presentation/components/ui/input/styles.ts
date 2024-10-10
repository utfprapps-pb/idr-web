import { cva } from 'class-variance-authority'
import clsx from 'clsx'

export const styles = clsx`
	flex h-10 w-full
	rounded-md border border-slate-300
	py-2
	text-base text-slate-900 bg-white
	ring-offset-slate-400
	file:border-0 file:bg-transparent file:text-sm file:font-medium
	placeholder:text-slate-400
	focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400
	disabled:cursor-not-allowed disabled:opacity-50
`

const variants = {
	isError: {
		true: clsx`border-destructive focus-visible:ring-0`,
		false: '',
	},
}

export const inputVariants = cva(styles, {
	variants,
	defaultVariants: {
		isError: false,
	},
})
