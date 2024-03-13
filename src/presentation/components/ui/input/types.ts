import { VariantProps } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'

import { inputVariants } from './styles'

export type InputIcon = {
	key: string
	icon: LucideIcon
	onClick?: () => void
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
	VariantProps<typeof inputVariants> & {
		iconsStart?: InputIcon[]
		iconsEnd?: InputIcon[]
		debounce?: number
		debounceCallback?: () => void
		mask?: (value: string) => string
	}
