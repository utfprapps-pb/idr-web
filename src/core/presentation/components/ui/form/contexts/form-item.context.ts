import { createCustomContext } from '@/core/presentation/contexts'

export type FormItemProviderProps = {
  id: string
}

const { Context, useContext } = createCustomContext<FormItemProviderProps>({
  providerFn: () => ({
    id: '',
  }),
})

export { Context as FormItemContext, useContext as useFormItemContext }
