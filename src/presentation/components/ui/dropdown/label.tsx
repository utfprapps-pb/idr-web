import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { Label as LabelPrimitive } from '@radix-ui/react-dropdown-menu'

import { cn } from '@/shared/utils'

export const Label = forwardRef<
  ElementRef<typeof LabelPrimitive>,
  ComponentPropsWithoutRef<typeof LabelPrimitive> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <LabelPrimitive
    ref={ref}
    className={cn(
      'px-2 py-1.5 text-sm font-semibold',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))

Label.displayName = LabelPrimitive.displayName
