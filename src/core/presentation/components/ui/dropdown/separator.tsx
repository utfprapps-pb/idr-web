import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { Separator as SeparatorPrimitive } from '@radix-ui/react-dropdown-menu'

import { cn } from '@/core/utils'

export const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive>,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive>
>(({ className, ...props }, ref) => (
  <SeparatorPrimitive
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))

Separator.displayName = SeparatorPrimitive.displayName
