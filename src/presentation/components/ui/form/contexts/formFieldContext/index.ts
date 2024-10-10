import { createCustomContext } from '@/presentation/contexts'

import type { FormFieldProviderProps } from './types'

export const { Context: FormFieldContext, useContext: useFormFieldContext } =
	createCustomContext<FormFieldProviderProps>({
		providerFn: () => ({
			name: '',
		}),
	})
