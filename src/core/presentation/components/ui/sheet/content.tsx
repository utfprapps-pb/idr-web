import { ElementRef, forwardRef, type ComponentPropsWithoutRef } from 'react'

import {
  Content as ContentPrimitive,
  Close as ClosePrimitive,
  Portal as PortalPrimitive,
} from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'
import { X } from 'lucide-react'

import { cn } from '@/core/utils'

import { Overlay } from './overlay'

const sheetVariants = cva(
  'flex flex-col fixed z-50 gap-4 bg-white p-8 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: clsx`inset-x-0 top-0 data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top`,
        bottom: clsx`inset-x-0 bottom-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom`,
        left: clsx`inset-y-0 left-0 h-full w-3/4 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl`,
        right: clsx`inset-y-0 right-0 h-full w-3/4 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl`,
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
)

export type ContentProps = ComponentPropsWithoutRef<typeof ContentPrimitive> &
  VariantProps<typeof sheetVariants>

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
