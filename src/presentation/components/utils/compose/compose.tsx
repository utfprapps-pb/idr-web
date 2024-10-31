import type { ComposeProps } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Compose: React.FC<ComposeProps<any>> = ({ components, children }) =>
  components.reduceRight(
    (acc, { component: Component, props }) => (
      <Component {...props}>{acc}</Component>
    ),
    children
  )

export { Compose }
