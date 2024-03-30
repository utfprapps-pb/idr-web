import { Root } from '@radix-ui/react-label'
import { VariantProps } from 'class-variance-authority'

import { labelVariants } from './styles'

export type LabelElement = React.ElementRef<typeof Root>
export type LabelProps = React.ComponentPropsWithoutRef<typeof Root> &
	VariantProps<typeof labelVariants>
