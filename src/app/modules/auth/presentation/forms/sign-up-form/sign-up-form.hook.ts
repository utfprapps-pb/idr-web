import { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { useHookForm, useIdrNavigate } from '@/core/presentation/hooks'
import { getApiErrorMessage } from '@/core/utils'

import { makeRemoteCreateUserUseCase } from '../../../main/factories/use-cases'
import {
  signUpFormFirstStepSchema,
  signUpFormSecondStepSchema,
  type SignUpFormFirstStepSchema,
  type SignUpFormSecondStepSchema,
} from '../../validations/sign-up-form-schema'

export function useSignUpForm() {
  const [isFirstStep, setIsFirstStep] = useState(true)
  const [firstStepData, setFirstStepData] =
    useState<SignUpFormFirstStepSchema | null>(null)

  const { navigateToBasePath } = useIdrNavigate()

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
      cityId: { label: '', value: '' },
      houseNumber: '',
    },
    resolver: zodResolver(
      isFirstStep ? signUpFormFirstStepSchema : signUpFormSecondStepSchema
    ),
  })

  const { mutateAsync: mutateHandleCreateUser } = useMutation({
    mutationFn: createUser.execute,
  })

  const handleGoBack = useCallback(() => {
    setIsFirstStep(true)
  }, [])

  const handleCreateUser = useCallback(
    async (data: SignUpFormFirstStepSchema & SignUpFormSecondStepSchema) => {
      try {
        if (isFirstStep) {
          setFirstStepData(data)
          setIsFirstStep(false)
          return
        }

        if (!firstStepData) {
          throw new Error('Dados do primeiro formulário não encontrados')
        }

        await mutateHandleCreateUser({ ...firstStepData, ...data })
        toast.success('Conta criada com sucesso')
        navigateToBasePath()
      } catch (error) {
        toast.error(getApiErrorMessage(error))
      }
    },
    [firstStepData, isFirstStep, mutateHandleCreateUser, navigateToBasePath]
  )

  return {
    form,
    isFirstStep,
    handleGoBack,
    handleCreateUser,
  }
}
