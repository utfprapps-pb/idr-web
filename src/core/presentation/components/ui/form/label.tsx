import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react'

import { Root } from '@radix-ui/react-label'

import { cn } from '@/core/utils'

import { Label as AppLabel } from '../label'

import { useFormField } from './hooks/form-field.hook'

export const Label = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField()

  return (
    <AppLabel
      ref={ref}
      className={cn(className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})

Label.displayName = 'FormLabel'
