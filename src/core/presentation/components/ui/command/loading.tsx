import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'

import { Command as CommandPrimitive } from 'cmdk'

export const Loading = forwardRef<
  ElementRef<typeof CommandPrimitive.Loading>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>((props, ref) => (
  <CommandPrimitive.Loading ref={ref} className="py-6" {...props} />
))

Loading.displayName = CommandPrimitive.Loading.displayName
