import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'

import { Action as ActionPrimitive } from '@radix-ui/react-alert-dialog'

import { cn } from '@/core/utils'

import { buttonVariants } from '../button'

export const Action = forwardRef<
  ElementRef<typeof ActionPrimitive>,
  ComponentPropsWithoutRef<typeof ActionPrimitive>
>(({ className, ...props }, ref) => (
  <ActionPrimitive
    ref={ref}
    className={cn(buttonVariants({ variant: 'destructive' }), className)}
    {...props}
  />
))

Action.displayName = ActionPrimitive.displayName
