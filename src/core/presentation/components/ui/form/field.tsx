import { useMemo } from 'react'

import {
  FieldValues,
  FieldPath,
  ControllerProps,
  Controller,
} from 'react-hook-form'

import { FormFieldContext } from './contexts'

export function Field<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ControllerProps<TFieldValues, TName>) {
  const providerProps = useMemo(() => ({ name: props.name }), [props.name])

  return (
    <FormFieldContext.Provider value={providerProps}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

Field.displayName = 'FormField'
