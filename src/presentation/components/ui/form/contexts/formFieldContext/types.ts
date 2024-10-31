import { PropsWithChildren } from 'react'

import { FieldValues, FieldPath } from 'react-hook-form'

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

export type FormFieldProviderProps = PropsWithChildren<Props>
