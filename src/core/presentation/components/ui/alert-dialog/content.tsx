import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'

import {
  Content as ContentPrimitive,
  Portal as PortalPrimitive,
} from '@radix-ui/react-alert-dialog'

import { cn } from '@/core/utils'

import { Overlay } from './overlay'

export const Content = forwardRef<
  ElementRef<typeof ContentPrimitive>,
  ComponentPropsWithoutRef<typeof ContentPrimitive>
>(({ className, ...props }, ref) => (
  <PortalPrimitive>
    <Overlay />
    <ContentPrimitive
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        className
      )}
      {...props}
    />
  </PortalPrimitive>
))

Content.displayName = ContentPrimitive.displayName
