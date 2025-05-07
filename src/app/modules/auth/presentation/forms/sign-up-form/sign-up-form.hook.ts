import { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { useHookForm } from '@/core/presentation/hooks'

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
  const [firstStepData, setFirstStepData] =
    useState<SignUpFormFirstStepSchema | null>(null)

  const createUser = makeRemoteCreateUserUseCase()

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

  const { mutateAsync: mutateHandleCreateUser } = useMutation({
    mutationFn: createUser.execute,
  })

  const handleCreateUser = useCallback(
    async (data: SignUpFormFirstStepSchema & SignUpFormSecondStepSchema) => {
      try {
        if (isFirstStep) {
          setFirstStepData(data)
          setIsFirstStep(false)
          return
        }

        await mutateHandleCreateUser({ ...firstStepData, ...data })
        toast.success('Conta criada com sucesso')
      } catch (error) {
        const axiosError = error as AxiosError
        toast.error(axiosError.message)
      }
    },
    [firstStepData, isFirstStep, mutateHandleCreateUser]
  )

  return {
    form,
    isFirstStep,
    handleCreateUser,
  }
}
