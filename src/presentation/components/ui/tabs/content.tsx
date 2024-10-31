import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { Content as ContentPrimitive } from '@radix-ui/react-tabs'

import { cn } from '@/shared/utils'

export const Content = forwardRef<
  ElementRef<typeof ContentPrimitive>,
  ComponentPropsWithoutRef<typeof ContentPrimitive>
>(({ className, ...props }, ref) => (
  <ContentPrimitive
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))

Content.displayName = ContentPrimitive.displayName
