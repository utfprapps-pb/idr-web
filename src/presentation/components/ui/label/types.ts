import React from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'
import { VariantProps } from 'class-variance-authority'

import { labelVariants } from './styles'

export type LabelProps = React.ComponentPropsWithRef<
	typeof LabelPrimitive.Root
> &
	VariantProps<typeof labelVariants>
