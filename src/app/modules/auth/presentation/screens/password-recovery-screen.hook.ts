import { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'

import { generateRoutePath } from '@/core/main/routes/generate-route-path'
import { useHookForm, useIdrNavigate } from '@/core/presentation/hooks'
import { getApiErrorMessage } from '@/core/utils'

import {
  makeRemoteResetPasswordUseCase,
  makeRemoteValidatePasswordRecoveryCodeUseCase,
} from '../../main/factories/use-cases'
import {
  recoveryCodeFormSchema,
  resetPasswordFormSchema,
  type RecoveryCodeFormSchema,
  type ResetPasswordFormSchema,
} from '../validations/password-recovery-form-schema'

type LocationState = { email?: string } | null

export function usePasswordRecoveryScreen() {
  const location = useLocation()
  const { navigate } = useIdrNavigate()
  const email = (location.state as LocationState)?.email ?? ''

  const [step, setStep] = useState<'code' | 'password'>('code')
  const [recoveryCode, setRecoveryCode] = useState('')
  const [viewPassword, setViewPassword] = useState(false)
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

  const remoteValidateCode = makeRemoteValidatePasswordRecoveryCodeUseCase()
  const remoteResetPassword = makeRemoteResetPasswordUseCase()

  const codeForm = useHookForm<RecoveryCodeFormSchema>({
    defaultValues: { recoveryCode: '' },
    resolver: zodResolver(recoveryCodeFormSchema),
  })

  const passwordForm = useHookForm<ResetPasswordFormSchema>({
    defaultValues: { newPassword: '', confirmPassword: '' },
    resolver: zodResolver(resetPasswordFormSchema),
  })

  const { mutateAsync: mutateValidateCode, isPending: isValidatingCode } =
    useMutation({ mutationFn: remoteValidateCode.execute })

  const { mutateAsync: mutateResetPassword, isPending: isResettingPassword } =
    useMutation({ mutationFn: remoteResetPassword.execute })

  const handleValidateCode = useCallback(
    async (data: RecoveryCodeFormSchema) => {
      try {
        await mutateValidateCode({ email, recoveryCode: data.recoveryCode })
        setRecoveryCode(data.recoveryCode)
        setStep('password')
      } catch (error) {
        toast.error(getApiErrorMessage(error))
      }
    },
    [mutateValidateCode, email]
  )

  const handleResetPassword = useCallback(
    async (data: ResetPasswordFormSchema) => {
      try {
        await mutateResetPassword({
          email,
          recoveryCode,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        })
        toast.success('Senha alterada com sucesso')
        navigate(generateRoutePath('LOGIN'))
      } catch (error) {
        toast.error(getApiErrorMessage(error))
      }
    },
    [mutateResetPassword, email, recoveryCode, navigate]
  )

  const handleGoBack = useCallback(() => {
    setStep('code')
    passwordForm.reset()
  }, [passwordForm])

  return {
    email,
    step,
    codeForm: {
      ...codeForm,
      buttonDisabled: codeForm.buttonDisabled || isValidatingCode,
    },
    passwordForm: {
      ...passwordForm,
      buttonDisabled: passwordForm.buttonDisabled || isResettingPassword,
    },
    viewPassword,
    setViewPassword,
    viewConfirmPassword,
    setViewConfirmPassword,
    handleSubmitCode: codeForm.handleSubmit(handleValidateCode),
    handleSubmitPassword: passwordForm.handleSubmit(handleResetPassword),
    handleGoBack,
  }
}
