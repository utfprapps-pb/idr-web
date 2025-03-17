import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/core/utils'

export const Root = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <aside
      ref={ref}
      className={cn('flex flex-col', 'px-6 py-8', className)}
      {...props}
    />
  )
)

Root.displayName = 'Sidebar'
