import { VariantProps } from 'class-variance-authority'

import { loadingVariants } from './styles'

export type LoadingProps = React.SVGAttributes<HTMLOrSVGElement> &
  VariantProps<typeof loadingVariants>
