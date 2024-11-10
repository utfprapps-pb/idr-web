import { forwardRef } from 'react'

import { Command as CommandPrimitive } from 'cmdk'

import { cn } from '@/shared/utils'

export const List = forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[300px] overflow-y-auto overflow-x-hidden', className)}
    {...props}
  />
))

List.displayName = CommandPrimitive.List.displayName
