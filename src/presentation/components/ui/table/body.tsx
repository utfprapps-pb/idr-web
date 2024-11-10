import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/shared/utils'

export const Body = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
))

Body.displayName = 'TableBody'
