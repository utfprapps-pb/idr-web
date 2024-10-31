import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/shared/utils'

export const Footer = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
      className
    )}
    {...props}
  />
))

Footer.displayName = 'TableFooter'
