import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { cn } from '@/core/utils'

export const List = forwardRef<
  HTMLOListElement,
  ComponentPropsWithoutRef<'ol'>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
      className
    )}
    {...props}
  />
))

List.displayName = 'BreadcrumbList'
