import { Content } from '@radix-ui/react-dialog'
import { VariantProps } from 'class-variance-authority'

import { sheetVariants } from './styles'

export type ContentProps = React.ComponentPropsWithoutRef<typeof Content> &
  VariantProps<typeof sheetVariants>
