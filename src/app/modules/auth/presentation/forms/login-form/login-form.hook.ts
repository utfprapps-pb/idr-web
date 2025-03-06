import { useState, useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { InvalidCredentialsError } from '@/core/domain/errors'
import { useAuth, useHookForm } from '@/core/presentation/hooks'

import { makeRemoteLoginUseCase } from '../../../main/factories/use-cases'
import {
  loginFormSchema,
  type LoginFormSchema,
} from '../../validations/login-form-schema'

export function useLoginForm() {
  const { signIn } = useAuth()

  const remoteLogin = makeRemoteLoginUseCase()

  const [viewPassword, setViewPassword] = useState(false)

  const form = useHookForm<LoginFormSchema>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginFormSchema),
  })

  const { mutateAsync: mutateHandleLogin, isPending } = useMutation({
    mutationFn: remoteLogin.execute,
  })

  const handleLogin = useCallback(
    async (data: LoginFormSchema) => {
      try {
        const { token } = await mutateHandleLogin(data)
        signIn(token)
      } catch (error) {
        if (error instanceof InvalidCredentialsError) {
          toast.error('Credenciais inválidas')
          return
        }

        toast.error('Erro inesperado, tente novamente mais tarde')
      }
    },
    [mutateHandleLogin, signIn]
  )

  const handleSubmit = form.handleSubmit(handleLogin)

  return {
    form: {
      ...form,
      buttonDisabled: form.buttonDisabled || isPending,
    },
    viewPassword,
    setViewPassword,
    handleSubmit,
  }
}
