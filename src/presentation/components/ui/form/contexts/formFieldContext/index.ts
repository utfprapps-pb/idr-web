import { createCustomContext } from '@/presentation/contexts'

import type { FormFieldProviderProps } from './types'

const { Context, useContext } = createCustomContext<FormFieldProviderProps>({
  providerFn: () => ({
    name: '',
  }),
})

export { Context as FormFieldContext, useContext as useFormFieldContext }
