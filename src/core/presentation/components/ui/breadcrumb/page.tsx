import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/core/utils'

export const Page = forwardRef<
  HTMLSpanElement,
  ComponentPropsWithoutRef<'span'>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('font-normal text-foreground', className)}
    {...props}
  />
))

Page.displayName = 'BreadcrumbPage'
