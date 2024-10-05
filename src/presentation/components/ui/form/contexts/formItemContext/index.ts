import { createCustomContext } from '@/presentation/contexts'

import type { FormItemProviderProps } from './types'

export const { Context: FormItemContext, useContext: useFormItemContext } =
	createCustomContext<FormItemProviderProps>({
		providerFn: () => ({
			id: ''
		})
	})
