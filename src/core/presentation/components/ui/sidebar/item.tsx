import { forwardRef, type ButtonHTMLAttributes } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

import { cn } from '@/core/utils'

const itemVariants = cva(
  'flex items-center px-2 py-1.5 gap-2 rounded-sm text-base cursor-pointer',
  {
    variants: {
      active: {
        false: clsx`text-slate-500`,
        true: clsx`text-primary-500 bg-primary-100 font-semibold`,
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

export type ItemProps = ButtonHTMLAttributes<HTMLDivElement> &
  VariantProps<typeof itemVariants>

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
