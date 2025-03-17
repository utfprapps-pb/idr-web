import type { HTMLAttributes } from 'react'

import { cn } from '@/core/utils'

export function Header({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col space-y-2 text-center sm:text-left',
        className
      )}
      {...props}
    />
  )
}

Header.displayName = 'SheetHeader'
