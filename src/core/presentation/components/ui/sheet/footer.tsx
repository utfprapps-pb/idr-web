import type { HTMLAttributes } from 'react'

import { cn } from '@/core/utils'

export function Footer({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col-reverse gap-4 mt-auto sm:flex-row sm:justify-center',
        className
      )}
      {...props}
    />
  )
}

Footer.displayName = 'SheetFooter'
