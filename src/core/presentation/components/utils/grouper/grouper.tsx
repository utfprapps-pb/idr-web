import {
  Children,
  type ComponentPropsWithoutRef,
  type PropsWithChildren,
} from 'react'

import { useWindowResize } from '@/core/presentation/hooks/window-resize.hook'
import { cn } from '@/core/utils'

type SectionProps = ComponentPropsWithoutRef<'section'>

export type GrouperProps = PropsWithChildren<SectionProps>

export function Grouper({ children, className, ...props }: GrouperProps) {
  const { width } = useWindowResize()

  const gridCols = width >= 640 ? Children.count(children) : 1

  return (
    <section
      style={{
        gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
      }}
      className={cn('grid gap-4 w-full', className)}
      {...props}
    >
      {children}
    </section>
  )
}

Grouper.displayName = 'Grouper'
