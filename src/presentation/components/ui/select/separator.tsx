import React from 'react'

import { Separator as SeparatorPrimitive } from '@radix-ui/react-select'

import { cn } from '@/shared/utils'

export const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive>
>(({ className, ...props }, ref) => (
  <SeparatorPrimitive
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))

Separator.displayName = SeparatorPrimitive.displayName
