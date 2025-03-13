import { forwardRef, ComponentProps } from 'react'

import { cn } from '@/core/utils'

export const Content = forwardRef<HTMLUListElement, ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  )
)

Content.displayName = 'PaginationContent'
