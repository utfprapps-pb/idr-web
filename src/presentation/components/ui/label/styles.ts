import { cva } from 'class-variance-authority'
import clsx from 'clsx'

const styles = clsx`
	text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
`

export const labelVariants = cva(styles)
