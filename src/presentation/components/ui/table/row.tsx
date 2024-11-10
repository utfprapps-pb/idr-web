import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/shared/utils'

export const Row = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      className
    )}
    {...props}
  />
))

Row.displayName = 'TableRow'
