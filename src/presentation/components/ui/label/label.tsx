import React from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'

import { cn } from '@/main/utils'

import { labelVariants } from './styles'
import { LabelElement, LabelProps } from './types'

const Label = React.forwardRef<LabelElement, LabelProps>(
	({ className, ...props }, ref) => (
		<LabelPrimitive.Root
			ref={ref}
			className={cn(labelVariants(), className)}
			{...props}
		/>
	)
)
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
