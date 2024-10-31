import { forwardRef } from 'react'

import { Root } from '@radix-ui/react-label'

import { cn } from '@/shared/utils'

import { labelVariants } from './styles'

import type { LabelElement, LabelProps } from './types'

export const Label = forwardRef<LabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <Root ref={ref} className={cn(labelVariants(), className)} {...props} />
  )
)

Label.displayName = Root.displayName
