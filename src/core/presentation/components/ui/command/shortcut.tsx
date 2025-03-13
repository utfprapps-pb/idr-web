import type { HTMLAttributes } from 'react'

import { cn } from '@/core/utils'

export function Shortcut({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'ml-auto text-xs tracking-widest text-muted-foreground',
        className
      )}
      {...props}
    />
  )
}

Shortcut.displayName = 'CommandShortcut'
