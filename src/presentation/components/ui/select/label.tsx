import React from 'react'

import { Label as LabelPrimitive } from '@radix-ui/react-select'

import { cn } from '@/shared/utils'

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive>
>(({ className, ...props }, ref) => (
  <LabelPrimitive
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
))

Label.displayName = LabelPrimitive.displayName
