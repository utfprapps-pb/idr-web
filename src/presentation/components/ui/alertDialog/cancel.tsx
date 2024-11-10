import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'

import { Cancel as CancelPrimitive } from '@radix-ui/react-alert-dialog'

import { cn } from '@/shared/utils'

import { buttonVariants } from '../button'

export const Cancel = forwardRef<
  ElementRef<typeof CancelPrimitive>,
  ComponentPropsWithoutRef<typeof CancelPrimitive>
>(({ className, ...props }, ref) => (
  <CancelPrimitive
    ref={ref}
    className={cn(
      buttonVariants({ variant: 'outline' }),
      'mt-2 sm:mt-0',
      className
    )}
    {...props}
  />
))

Cancel.displayName = CancelPrimitive.displayName
