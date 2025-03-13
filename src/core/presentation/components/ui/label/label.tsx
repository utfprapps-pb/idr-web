import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'

import { Root } from '@radix-ui/react-label'

import { cn } from '@/core/utils'

type LabelElement = ElementRef<typeof Root>
type LabelProps = ComponentPropsWithoutRef<typeof Root>

export const Label = forwardRef<LabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  )
)

Label.displayName = Root.displayName
