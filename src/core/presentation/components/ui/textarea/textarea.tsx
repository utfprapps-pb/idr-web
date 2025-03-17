import { type TextareaHTMLAttributes, forwardRef } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

import { cn } from '@/core/utils'

const textAreaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base ring-offset-slate-400 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      isError: {
        true: clsx`border-destructive focus-visible:ring-0`,
        false: '',
      },
    },
    defaultVariants: {
      isError: false,
    },
  }
)
export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textAreaVariants>

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, isError, ...props }, ref) => (
    <textarea
      className={cn(textAreaVariants({ className, isError }))}
      ref={ref}
      {...props}
    />
  )
)
Textarea.displayName = 'Textarea'
