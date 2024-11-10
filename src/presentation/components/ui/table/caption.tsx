import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/shared/utils'

export const Caption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
))

Caption.displayName = 'TableCaption'
