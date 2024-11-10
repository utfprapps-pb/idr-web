import { useCallback } from 'react'

import {
  type DefaultValues,
  type FieldValues,
  type Resolver,
  type SubmitErrorHandler,
  type SubmitHandler,
  type UseFormProps,
  useForm,
} from 'react-hook-form'
import toast from 'react-hot-toast'

export type UseHookFormProps<TDefaultValues extends FieldValues> = {
  values?: UseFormProps<TDefaultValues>['values']
  defaultValues?: DefaultValues<TDefaultValues>

  resolver?: Resolver<TDefaultValues>
}

export const useHookForm = <TDefaultValues extends FieldValues>({
  values,
  defaultValues,
  resolver,
}: UseHookFormProps<TDefaultValues>) => {
  const form = useForm<TDefaultValues>({
    mode: 'all',
    defaultValues,
    values,
    resolver,
  })

  const {
    formState: { isSubmitting, isValidating },
    handleSubmit,
  } = form

  const buttonDisabled = isSubmitting || isValidating

  const onSubmit = useCallback(
    (successCallback: SubmitHandler<TDefaultValues>) => {
      const errorCallback: SubmitErrorHandler<TDefaultValues> = () => {
        toast.error('Preencha os campos obrigatórios')
      }

      return handleSubmit(successCallback, errorCallback)
    },
    [handleSubmit]
  )

  return {
    ...form,
    handleSubmit: onSubmit,
    buttonDisabled,
  }
}
