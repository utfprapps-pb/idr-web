import type { PropsWithChildren, ReactNode } from 'react'

type ComponentWithProps<TProps> = {
  component: (props: PropsWithChildren<TProps>) => ReactNode
  props?: TProps
}

type Props<TProps> = {
  components: ComponentWithProps<TProps>[]
}

export type ComposeProps<TProps> = PropsWithChildren<Props<TProps>>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Compose({ components, children }: ComposeProps<any>) {
  return components.reduceRight(
    (acc, { component: Component, props }) => (
      <Component {...props}>{acc}</Component>
    ),
    children
  )
}

Compose.displayName = 'Compose'
