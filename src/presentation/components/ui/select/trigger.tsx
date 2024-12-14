import React from 'react'

import {
  Trigger as TriggerPrimitive,
  Icon as IconPrimitive,
} from '@radix-ui/react-select'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/shared/utils'

export const Trigger = React.forwardRef<
  React.ElementRef<typeof TriggerPrimitive>,
  React.ComponentPropsWithoutRef<typeof TriggerPrimitive>
>(({ className, children, ...props }, ref) => (
  <TriggerPrimitive
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <IconPrimitive asChild>
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </IconPrimitive>
  </TriggerPrimitive>
))

Trigger.displayName = TriggerPrimitive.displayName
