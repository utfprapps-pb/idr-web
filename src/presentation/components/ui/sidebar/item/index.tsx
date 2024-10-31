import { forwardRef } from 'react'

import { cn } from '@/shared/utils'

import { itemVariants } from './styles'
import { ItemProps } from './types'

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ className, active, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(itemVariants({ active, className }))}
      {...props}
    />
  )
)

Item.displayName = 'SidebarItem'
