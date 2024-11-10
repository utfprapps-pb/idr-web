import { ElementRef, forwardRef } from 'react'

import {
  Content as ContentPrimitive,
  Close as ClosePrimitive,
  Portal as PortalPrimitive,
} from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/shared/utils'

import { Overlay } from '../overlay'

import { sheetVariants } from './styles'
import { ContentProps } from './types'

export const Content = forwardRef<
  ElementRef<typeof ContentPrimitive>,
  ContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <PortalPrimitive>
    <Overlay />
    <ContentPrimitive
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <ClosePrimitive className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Fechar</span>
      </ClosePrimitive>
    </ContentPrimitive>
  </PortalPrimitive>
))

Content.displayName = ContentPrimitive.displayName
