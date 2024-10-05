import { cva } from 'class-variance-authority'
import clsx from 'clsx'

const baseStyles = clsx`flex flex-col fixed z-50 gap-4 bg-white p-8 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500`

export const sheetVariants = cva(baseStyles, {
	variants: {
		side: {
			top: clsx`inset-x-0 top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top`,
			bottom: clsx`inset-x-0 bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom`,
			left: clsx`inset-y-0 left-0 h-full w-3/4 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl`,
			right: clsx`inset-y-0 right-0 h-full w-3/4 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl`
		}
	},
	defaultVariants: {
		side: 'right'
	}
})
