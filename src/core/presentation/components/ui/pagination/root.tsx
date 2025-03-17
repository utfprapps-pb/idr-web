import { ComponentProps } from 'react'

import { cn } from '@/core/utils'

export function Root({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

Root.displayName = 'Pagination'
