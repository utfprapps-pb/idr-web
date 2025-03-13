import { type HTMLAttributes } from 'react'

import { cn } from '@/core/utils'

export const Header = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className
    )}
    {...props}
  />
)

Header.displayName = 'AlertDialogHeader'
