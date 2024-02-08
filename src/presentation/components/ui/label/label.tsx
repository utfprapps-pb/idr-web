import React from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/main/utils'

import { labelVariants } from './styles'
import { LabelProps } from './types'

const Label: React.FC<LabelProps> = ({ className, ...props }, ref) => (
	<LabelPrimitive.Root
		ref={ref}
		className={cn(labelVariants(), className)}
		{...props}
	/>
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
