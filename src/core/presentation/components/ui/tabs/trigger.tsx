import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { Trigger as TriggerPrimitive } from '@radix-ui/react-tabs'

import { cn } from '@/core/utils'

export const Trigger = forwardRef<
  ElementRef<typeof TriggerPrimitive>,
  ComponentPropsWithoutRef<typeof TriggerPrimitive>
>(({ className, ...props }, ref) => (
  <TriggerPrimitive
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
))

Trigger.displayName = TriggerPrimitive.displayName
