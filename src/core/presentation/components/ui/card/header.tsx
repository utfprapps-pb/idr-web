import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/core/utils'

export const Header = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col gap-1.5', className)}
    {...props}
  />
))

Header.displayName = 'CardHeader'
