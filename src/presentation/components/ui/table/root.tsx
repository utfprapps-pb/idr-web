import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/shared/utils'

export const Root = forwardRef<
  HTMLTableElement,
  HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
))

Root.displayName = 'Table'
