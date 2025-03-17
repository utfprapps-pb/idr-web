import type { ComponentProps } from 'react'

import { MoreHorizontal } from 'lucide-react'

import { cn } from '@/core/utils'

export function Ellipsis({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      className={cn(
        'flex h-9 w-9 items-center justify-center cursor-default',
        className
      )}
      {...props}
    >
      <MoreHorizontal size={16} />
    </span>
  )
}

Ellipsis.displayName = 'PaginationEllipsis'
