import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'

import { Fallback as FallbackPrimitive } from '@radix-ui/react-avatar'

import { cn } from '@/core/utils'

export const Fallback = forwardRef<
  ElementRef<typeof FallbackPrimitive>,
  ComponentPropsWithoutRef<typeof FallbackPrimitive>
>(({ className, ...props }, ref) => (
  <FallbackPrimitive
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
))

Fallback.displayName = FallbackPrimitive.displayName
