import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import {
  Content as ContentPrimitive,
  Portal,
} from '@radix-ui/react-dropdown-menu'

import { cn } from '@/core/utils'

export const Content = forwardRef<
  ElementRef<typeof ContentPrimitive>,
  ComponentPropsWithoutRef<typeof ContentPrimitive>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Portal>
    <ContentPrimitive
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </Portal>
))

Content.displayName = ContentPrimitive.displayName
