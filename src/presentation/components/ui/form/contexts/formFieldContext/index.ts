import { createCustomContextFactory } from '@/presentation/factories'

import type { FormFieldProviderProps } from './types'

export const { Context: FormFieldContext, useContext: useFormFieldContext } =
	createCustomContextFactory<FormFieldProviderProps>({
		providerFn: () => ({
			name: ''
		})
	})
