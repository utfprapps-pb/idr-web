import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/core/utils'

type BodyProps = HTMLAttributes<HTMLTableSectionElement> & {
  showLastRowBorder?: boolean
}

export const Body = forwardRef<HTMLTableSectionElement, BodyProps>(
  ({ className, showLastRowBorder = false, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn(
        !showLastRowBorder && '[&_tr:last-child]:border-0',
        className
      )}
      {...props}
    />
  )
)

Body.displayName = 'TableBody'
