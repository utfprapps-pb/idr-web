import React from 'react'

import { cn } from '@/shared/utils'

import { textAreaVariants } from './styles'

import type { TextareaProps } from './types'

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isError, ...props }, ref) => (
    <textarea
      className={cn(textAreaVariants({ className, isError }))}
      ref={ref}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'

export { Textarea }
