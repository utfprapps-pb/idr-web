import { PropsWithChildren, ReactNode } from 'react'

type Component<TProps> = (props: PropsWithChildren<TProps>) => ReactNode

type ComponentWithProps<TProps> = {
  component: Component<TProps>
  props?: TProps
}

type Props<TProps> = {
  components: ComponentWithProps<TProps>[]
}

export type ComposeProps<TProps extends object> = PropsWithChildren<
  Props<TProps>
>
