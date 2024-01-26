import { ComposeProps } from './types'

export const Compose: React.FC<ComposeProps> = ({ components, children }) =>
	components.reduceRight(
		(acc, Component) => <Component>{acc}</Component>,
		children
	)
