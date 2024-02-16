import { createCustomContextFactory } from '@/presentation/factories'

import { FormItemProviderProps } from './types'

export const { Context: FormItemContext, useContext: useFormItemContext } =
	createCustomContextFactory<FormItemProviderProps>({
		providerFn: () => ({
			id: ''
		})
	})
