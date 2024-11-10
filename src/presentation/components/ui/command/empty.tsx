import { forwardRef } from 'react'

import { Command as CommandPrimitive } from 'cmdk'

export const Empty = forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
))

Empty.displayName = CommandPrimitive.Empty.displayName
