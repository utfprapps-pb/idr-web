import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { Item as ItemPrimitive } from '@radix-ui/react-dropdown-menu'

import { cn } from '@/core/utils'

export const Item = forwardRef<
  ElementRef<typeof ItemPrimitive>,
  ComponentPropsWithoutRef<typeof ItemPrimitive> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ItemPrimitive
    ref={ref}
    className={cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      className
    )}
    {...props}
  />
))

Item.displayName = ItemPrimitive.displayName
