import React from 'react'

import { Dialog as AppDialog } from '../dialog'

import { Root as Command } from './root'

import type { DialogProps } from '@radix-ui/react-dialog'

export const Dialog: React.FC<DialogProps> = ({ children, ...props }) => (
  <AppDialog.Root {...props}>
    <AppDialog.Content className="overflow-hidden p-0 shadow-lg">
      <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
        {children}
      </Command>
    </AppDialog.Content>
  </AppDialog.Root>
)
