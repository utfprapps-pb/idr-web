import {
  forwardRef,
  type ElementRef,
  type ComponentPropsWithoutRef,
} from 'react'

import {
  Trigger as TriggerPrimitive,
  Icon as IconPrimitive,
} from '@radix-ui/react-select'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDownIcon } from 'lucide-react'

import { cn } from '@/core/utils'

const triggerVariants = cva(
  'flex h-10 w-full items-center justify-between rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
  {
    variants: {
      isError: {
        true: 'border-destructive',
        false: 'border-input',
      },
    },
    defaultVariants: {
      isError: false,
    },
  }
)

export const Trigger = forwardRef<
  ElementRef<typeof TriggerPrimitive>,
  ComponentPropsWithoutRef<typeof TriggerPrimitive> &
    VariantProps<typeof triggerVariants>
>(({ className, children, isError, ...props }, ref) => (
  <TriggerPrimitive
    ref={ref}
    className={cn(triggerVariants({ isError, className }))}
    {...props}
  >
    {children}
    <IconPrimitive asChild>
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </IconPrimitive>
  </TriggerPrimitive>
))

Trigger.displayName = TriggerPrimitive.displayName
