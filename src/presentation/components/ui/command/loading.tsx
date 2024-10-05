import { forwardRef } from 'react'

import { Command as CommandPrimitive } from 'cmdk'

export const Loading = forwardRef<
	React.ElementRef<typeof CommandPrimitive.Loading>,
	React.ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>((props, ref) => (
	<CommandPrimitive.Loading ref={ref} className="py-6" {...props} />
))

Loading.displayName = CommandPrimitive.Loading.displayName
