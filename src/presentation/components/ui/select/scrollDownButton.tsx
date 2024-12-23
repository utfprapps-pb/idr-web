import React from 'react'

import { ScrollDownButton as ScrollDownButtonPrimitive } from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/shared/utils'

export const ScrollDownButton = React.forwardRef<
  React.ElementRef<typeof ScrollDownButtonPrimitive>,
  React.ComponentPropsWithoutRef<typeof ScrollDownButtonPrimitive>
>(({ className, ...props }, ref) => (
  <ScrollDownButtonPrimitive
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </ScrollDownButtonPrimitive>
))

ScrollDownButton.displayName = ScrollDownButtonPrimitive.displayName
