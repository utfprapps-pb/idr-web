import { useCallback, useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { useCepQuery, useHookForm } from '@/core/presentation/hooks'

import { makeRemoteCreateUserUseCase } from '../../../main/factories/use-cases'
import {
  signUpFormFirstStepSchema,
  signUpFormSecondStepSchema,
  type SignUpFormFirstStepSchema,
  type SignUpFormSecondStepSchema,
} from '../../validations/sign-up-form-schema'

import type { AxiosError } from 'axios'

export function useSignUpForm() {
  const [isFirstStep, setIsFirstStep] = useState(true)

  const createUser = makeRemoteCreateUserUseCase()

  const { mutateAsync: mutateHandleCreateUser } = useMutation({
    mutationFn: createUser.execute,
  })

  const handleCreateUser = useCallback(
    async (data: SignUpFormFirstStepSchema & SignUpFormSecondStepSchema) => {
      try {
        if (isFirstStep) {
          setIsFirstStep(false)
          return
        }

        await mutateHandleCreateUser(data)
        toast.success('Conta criada com sucesso')
      } catch (error) {
        const axiosError = error as AxiosError
        toast.error(axiosError.message)
      }
    },
    [isFirstStep, mutateHandleCreateUser]
  )

  const form = useHookForm<
    SignUpFormFirstStepSchema & SignUpFormSecondStepSchema
  >({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      cpf: '',
      phone: '',
      graduationYear: '',
      professionalRegister: '',
      cep: '',
      street: '',
      city: '',
      houseNumber: '',
    },
    resolver: zodResolver(
      isFirstStep ? signUpFormFirstStepSchema : signUpFormSecondStepSchema
    ),
  })

  const { address, isLoading: cepLoading } = useCepQuery(form.getValues('cep'))

  useEffect(() => {
    if (address) {
      form.setValue('street', address.street, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      })
      form.setValue('city', address.city, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      })
    }
  }, [address, form])

  return {
    cepLoading,
    form,
    isFirstStep,
    handleCreateUser,
  }
}
