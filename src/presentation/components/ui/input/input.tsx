import * as React from 'react'

import { cn } from '@/main/utils'

import { styles } from './styles'

import type { InputProps } from './types'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, mask, onChange, ...props }, ref) => {
		const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			if (mask) {
				const maskedValue = mask(e.target.value)
				e.target.value = maskedValue
				return onChange?.(e)
			}

			return onChange?.(e)
		}

		Object.assign(props, {
			onChange: handleOnChange
		})

		return (
			<input
				type={type}
				className={cn(styles, className)}
				ref={ref}
				{...props}
			/>
		)
	}
)

Input.displayName = 'Input'
export { Input }
