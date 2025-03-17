import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'

import { Title as TitlePrimitive } from '@radix-ui/react-dialog'

import { cn } from '@/core/utils'

export const Title = forwardRef<
  ElementRef<typeof TitlePrimitive>,
  ComponentPropsWithoutRef<typeof TitlePrimitive>
>(({ className, ...props }, ref) => (
  <TitlePrimitive
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))

Title.displayName = TitlePrimitive.displayName
