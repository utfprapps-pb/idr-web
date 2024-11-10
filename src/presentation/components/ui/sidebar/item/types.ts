import { VariantProps } from 'class-variance-authority'

import { itemVariants } from './styles'

export type ItemProps = React.ButtonHTMLAttributes<HTMLDivElement> &
  VariantProps<typeof itemVariants>
