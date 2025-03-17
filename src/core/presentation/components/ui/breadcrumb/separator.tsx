import type { ComponentProps } from 'react'

import { ChevronRightIcon } from 'lucide-react'

import { cn } from '@/core/utils'

export function Separator({
  children,
  className,
  ...props
}: ComponentProps<'li'>) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn('[&>svg]:w-3.5 [&>svg]:h-3.5', className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  )
}

Separator.displayName = 'BreadcrumbSeparator'
