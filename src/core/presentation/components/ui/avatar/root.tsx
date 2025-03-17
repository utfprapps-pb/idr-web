import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'

import { Root as RootPrimitive } from '@radix-ui/react-avatar'

import { cn } from '@/core/utils'

export const Root = forwardRef<
  ElementRef<typeof RootPrimitive>,
  ComponentPropsWithoutRef<typeof RootPrimitive>
>(({ className, ...props }, ref) => (
  <RootPrimitive
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
))

Root.displayName = RootPrimitive.displayName
