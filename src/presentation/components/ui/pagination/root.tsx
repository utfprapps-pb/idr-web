import { ComponentProps } from 'react'

import { cn } from '@/shared/utils'

export const Root = ({ className, ...props }: ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)

Root.displayName = 'Pagination'
