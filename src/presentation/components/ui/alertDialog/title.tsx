import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'

import { Title as TitlePrimitive } from '@radix-ui/react-alert-dialog'

import { cn } from '@/shared/utils'

export const Title = forwardRef<
  ElementRef<typeof TitlePrimitive>,
  ComponentPropsWithoutRef<typeof TitlePrimitive>
>(({ className, ...props }, ref) => (
  <TitlePrimitive
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
))

Title.displayName = TitlePrimitive.displayName
