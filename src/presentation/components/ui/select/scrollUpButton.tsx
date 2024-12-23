import React from 'react'

import { ScrollUpButton as ScrollUpButtonPrimitive } from '@radix-ui/react-select'
import { ChevronUpIcon } from 'lucide-react'

import { cn } from '@/shared/utils'

export const ScrollUpButton = React.forwardRef<
  React.ElementRef<typeof ScrollUpButtonPrimitive>,
  React.ComponentPropsWithoutRef<typeof ScrollUpButtonPrimitive>
>(({ className, ...props }, ref) => (
  <ScrollUpButtonPrimitive
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center py-1',
      className
    )}
    {...props}
  >
    <ChevronUpIcon className="h-4 w-4" />
  </ScrollUpButtonPrimitive>
))

ScrollUpButton.displayName = ScrollUpButtonPrimitive.displayName
