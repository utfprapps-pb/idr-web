import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/core/utils'

export const Link = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<'a'> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : 'a'

  return (
    <Comp
      ref={ref}
      className={cn(
        'transition-colors hover:text-foreground cursor-pointer',
        className
      )}
      {...props}
    />
  )
})

Link.displayName = 'BreadcrumbLink'
