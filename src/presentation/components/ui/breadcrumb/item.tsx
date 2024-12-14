import React from 'react'

import { cn } from '@/shared/utils'

export const Item = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<'li'>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
))

Item.displayName = 'BreadcrumbItem'
