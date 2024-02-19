import * as React from 'react'

import { cn } from '@/main/utils'

import { styles } from './styles'

import type { InputProps } from './types'

const Input: React.FC<InputProps> = ({ className, type, ref, ...props }) => (
	<input type={type} className={cn(styles, className)} ref={ref} {...props} />
)

Input.displayName = 'Input'
export { Input }
