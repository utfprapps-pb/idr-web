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

export function useHookForm<TDefaultValues extends FieldValues>({
  values,
  defaultValues,
  resolver,
}: UseHookFormProps<TDefaultValues>) {
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

  const onSubmitWithCustomError = useCallback(
    (
      successCallback: SubmitHandler<TDefaultValues>,
      customErrorCallback?: (
        errors: Parameters<SubmitErrorHandler<TDefaultValues>>[0],
        event: Parameters<SubmitErrorHandler<TDefaultValues>>[1]
      ) => boolean | void
    ) => {
      const errorCallback: SubmitErrorHandler<TDefaultValues> = (
        errors,
        event
      ) => {
        let handled = false

        if (customErrorCallback) {
          const result = customErrorCallback(errors, event)
          handled = result === true
        }

        if (!handled) {
          toast.error('Preencha os campos obrigatórios')
        }
      }

      return handleSubmit(successCallback, errorCallback)
    },
    [handleSubmit]
  )

  return {
    ...form,
    handleSubmit: onSubmit,
    handleSubmitWithCustomError: onSubmitWithCustomError,
    buttonDisabled,
  }
}
