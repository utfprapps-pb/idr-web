import React from 'react'

import * as LabelPrimitive from '@radix-ui/react-label'
import { VariantProps } from 'class-variance-authority'

import { labelVariants } from './styles'

export type LabelElement = React.ElementRef<typeof LabelPrimitive.Root>
export type LabelProps = React.ComponentPropsWithoutRef<
	typeof LabelPrimitive.Root
> &
	VariantProps<typeof labelVariants>
