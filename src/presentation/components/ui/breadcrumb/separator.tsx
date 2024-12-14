import { ChevronRightIcon } from 'lucide-react'

import { cn } from '@/shared/utils'

export const Separator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:w-3.5 [&>svg]:h-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRightIcon />}
  </li>
)

Separator.displayName = 'BreadcrumbSeparator'
