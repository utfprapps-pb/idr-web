import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'

import {
  Root as ScrollAreaPrimitive,
  Viewport as ViewportPrimitive,
  Corner as CornerPrimitive,
} from '@radix-ui/react-scroll-area'

import { cn } from '@/core/utils'

import { ScrollBar } from './scroll-bar'

export const Root = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ViewportPrimitive className="h-full w-full rounded-[inherit]">
      {children}
    </ViewportPrimitive>
    <ScrollBar />
    <CornerPrimitive />
  </ScrollAreaPrimitive>
))

Root.displayName = ScrollAreaPrimitive.displayName
