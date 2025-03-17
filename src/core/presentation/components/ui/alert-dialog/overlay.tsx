import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'

import { Overlay as OverlayPrimitive } from '@radix-ui/react-alert-dialog'

import { cn } from '@/core/utils'

export const Overlay = forwardRef<
  ElementRef<typeof OverlayPrimitive>,
  ComponentPropsWithoutRef<typeof OverlayPrimitive>
>(({ className, ...props }, ref) => (
  <OverlayPrimitive
    className={cn(
      'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
))

Overlay.displayName = OverlayPrimitive.displayName
