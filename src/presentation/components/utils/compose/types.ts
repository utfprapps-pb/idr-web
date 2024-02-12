import { PropsWithChildren, ReactNode } from 'react'

type Component = (props: PropsWithChildren) => ReactNode

type Props = {
	components: Component[]
}

export type ComposeProps = PropsWithChildren<Props>
