import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'

import {
  Content as ContentPrimitive,
  Portal as PortalPrimitive,
  Viewport as ViewportPrimitive,
} from '@radix-ui/react-select'

import { cn } from '@/core/utils'

import { ScrollDownButton } from './scroll-down-button'
import { ScrollUpButton } from './scroll-up-button'

export const Content = forwardRef<
  ElementRef<typeof ContentPrimitive>,
  ComponentPropsWithoutRef<typeof ContentPrimitive>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <PortalPrimitive>
    <ContentPrimitive
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <ScrollUpButton />
      <ViewportPrimitive
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </ViewportPrimitive>
      <ScrollDownButton />
    </ContentPrimitive>
  </PortalPrimitive>
))

Content.displayName = ContentPrimitive.displayName
