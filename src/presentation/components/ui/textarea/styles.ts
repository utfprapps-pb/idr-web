import { cva } from 'class-variance-authority'
import clsx from 'clsx'

export const styles = clsx`flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base ring-offset-slate-400 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50`

const variants = {
	isError: {
		true: clsx`border-destructive focus-visible:ring-0`,
		false: ''
	}
}

export const textAreaVariants = cva(styles, {
	variants,
	defaultVariants: {
		isError: false
	}
})
