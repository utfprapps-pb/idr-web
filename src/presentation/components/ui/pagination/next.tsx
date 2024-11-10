import { ComponentProps } from 'react'

import { ChevronRight } from 'lucide-react'

import { cn } from '@/shared/utils'

import { Link } from './link'

type NextProps = ComponentProps<typeof Link> & {
  text?: string
}

export const Next: React.FC<NextProps> = ({
  className,
  text = 'Próximo',
  ...props
}) => (
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

Next.displayName = 'PaginationNext'
