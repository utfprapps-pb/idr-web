import { ComponentProps } from 'react'

import { ChevronRight } from 'lucide-react'

import { cn } from '@/core/utils'

import { Link } from './link'

type NextProps = ComponentProps<typeof Link> & {
  text?: string
}

export function Next({ className, text = 'Próximo', ...props }: NextProps) {
  return (
    <Link
      aria-label="Vai para a próxima página"
      size="default"
      className={cn('gap-1 pr-2.5', className)}
      {...props}
    >
      <span>{text}</span>
      <ChevronRight className="h-4 w-4" />
    </Link>
  )
}

Next.displayName = 'PaginationNext'
