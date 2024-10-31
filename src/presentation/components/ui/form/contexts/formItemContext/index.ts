import { createCustomContext } from '@/presentation/contexts'

import type { FormItemProviderProps } from './types'

const { Context, useContext } = createCustomContext<FormItemProviderProps>({
  providerFn: () => ({
    id: '',
  }),
})

export { Context as FormItemContext, useContext as useFormItemContext }
