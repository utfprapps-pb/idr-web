import type { ComposeProps } from './types'

const Compose: React.FC<ComposeProps<any>> = ({ components, children }) =>
	components.reduceRight(
		(acc, { component: Component, props }) => (
			<Component {...props}>{acc}</Component>
		),
		children
	)

export { Compose }
