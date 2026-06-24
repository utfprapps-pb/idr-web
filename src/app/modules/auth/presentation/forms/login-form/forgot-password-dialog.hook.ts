import { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { generateRoutePath } from '@/core/main/routes/generate-route-path'
import { useHookForm, useIdrNavigate } from '@/core/presentation/hooks'
import { getApiErrorMessage } from '@/core/utils'

import { makeRemoteRequestPasswordRecoveryUseCase } from '../../../main/factories/use-cases'
import {
  requestPasswordRecoveryFormSchema,
  type RequestPasswordRecoveryFormSchema,
} from '../../validations/request-password-recovery-form-schema'

export function useForgotPasswordDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const { navigate } = useIdrNavigate()

  const remoteRequestPasswordRecovery =
    makeRemoteRequestPasswordRecoveryUseCase()

  const form = useHookForm<RequestPasswordRecoveryFormSchema>({
    defaultValues: { email: '' },
    resolver: zodResolver(requestPasswordRecoveryFormSchema),
  })

  const { mutateAsync: mutateHandleRequest, isPending } = useMutation({
    mutationFn: remoteRequestPasswordRecovery.execute,
  })

  const handleOpen = useCallback(() => {
    form.reset()
    setIsOpen(true)
  }, [form])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleRequest = useCallback(
    async (data: RequestPasswordRecoveryFormSchema) => {
      try {
        await mutateHandleRequest(data)
        handleClose()
        navigate(generateRoutePath('PASSWORD_RECOVERY'), {
          state: { email: data.email },
        })
      } catch (error) {
        toast.error(getApiErrorMessage(error))
      }
    },
    [mutateHandleRequest, handleClose, navigate]
  )

  const handleSubmit = form.handleSubmit(handleRequest)

  return {
    isOpen,
    handleOpen,
    handleClose,
    form: {
      ...form,
      buttonDisabled: form.buttonDisabled || isPending,
    },
    handleSubmit,
  }
}
