import type { ComponentProps } from 'react'

import { cn } from '@/core/utils'

import { ButtonProps, buttonVariants } from '../button'

type LinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  ComponentProps<'a'>

export function Link({
  className,
  isActive,
  size = 'icon',
  children,
  ...props
}: LinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

Link.displayName = 'PaginationLink'
