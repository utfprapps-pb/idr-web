import type { ComposeProps } from './types'

const Compose: React.FC<ComposeProps> = ({ components, children }) =>
	components.reduceRight(
		(acc, Component) => <Component>{acc}</Component>,
		children
	)

export { Compose }
