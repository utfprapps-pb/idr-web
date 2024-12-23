import React from 'react'

import {
  Item as ItemPrimitive,
  ItemIndicator as ItemIndicatorPrimitive,
  ItemText as ItemTextPrimitive,
} from '@radix-ui/react-select'
import { Check } from 'lucide-react'

import { cn } from '@/shared/utils'

export const Item = React.forwardRef<
  React.ElementRef<typeof ItemPrimitive>,
  React.ComponentPropsWithoutRef<typeof ItemPrimitive>
>(({ className, children, ...props }, ref) => (
  <ItemPrimitive
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ItemIndicatorPrimitive>
        <Check className="h-4 w-4" />
      </ItemIndicatorPrimitive>
    </span>

    <ItemTextPrimitive>{children}</ItemTextPrimitive>
  </ItemPrimitive>
))

Item.displayName = ItemPrimitive.displayName
