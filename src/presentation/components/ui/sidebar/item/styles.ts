import { cva } from 'class-variance-authority'
import clsx from 'clsx'

const baseStyles = clsx`flex items-center px-2 py-1.5 gap-2 rounded-sm text-base cursor-pointer`

const variants = {
	active: {
		false: clsx`text-slate-500`,
		true: clsx`text-primary-500 bg-primary-100 font-semibold`
	}
}

export const itemVariants = cva(baseStyles, {
	variants,
	defaultVariants: {
		active: false
	}
})
