import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/core/utils'

export const Item = forwardRef<HTMLLIElement, ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn('inline-flex items-center gap-1.5', className)}
      {...props}
    />
  )
)

Item.displayName = 'BreadcrumbItem'
