import React from 'react'

import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/shared/utils'

export const Link = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      ref={ref}
      className={cn('transition-colors hover:text-foreground', className)}
      {...props}
    />
  )
})

Link.displayName = 'BreadcrumbLink'
