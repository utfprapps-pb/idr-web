import { ComponentProps } from 'react'

import { ChevronLeft } from 'lucide-react'

import { cn } from '@/core/utils'

import { Link } from './link'

type PreviousProps = ComponentProps<typeof Link> & {
  text?: string
}

export function Previous({
  className,
  text = 'Anterior',
  ...props
}: PreviousProps) {
  return (
    <Link
      aria-label="Vai para página anterior"
      size="default"
      className={cn('gap-1 pl-2.5', className)}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>{text}</span>
    </Link>
  )
}

Previous.displayName = 'PaginationPrevious'
