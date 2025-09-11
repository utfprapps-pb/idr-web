import type { PropsWithChildren } from 'react'

import { createCustomContext } from '@/core/presentation/contexts'

import type { FieldValues, FieldPath } from 'react-hook-form'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

export type FormFieldProviderProps = PropsWithChildren<Props>

const { Context, useContext } = createCustomContext<FormFieldProviderProps>({
  providerFn: () => ({
    name: '',
  }),
})

export { Context as FormFieldContext, useContext as useFormFieldContext }
