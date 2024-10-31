import { forwardRef, ComponentProps } from 'react'

import { cn } from '@/shared/utils'

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
