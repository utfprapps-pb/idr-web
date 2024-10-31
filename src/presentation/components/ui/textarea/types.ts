import { textAreaVariants } from './styles'

import type { VariantProps } from 'class-variance-authority'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textAreaVariants>
