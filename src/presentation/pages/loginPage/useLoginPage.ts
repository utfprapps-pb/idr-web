import { useCallback, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/domain/errors'
import { useAuth } from '@/presentation/contexts'
import { useHookForm } from '@/presentation/hooks/useHookForm'

import type { LoginPageProps } from './types'
import type { LoginParams } from '@/domain/useCases/auth'

const schema = z.object({
	email: z
		.string()
		.min(1, 'Email é obrigatório')
		.email('Informe um email válido'),
	password: z.string().min(1, 'Senha é obrigatório')
})

type FormData = z.infer<typeof schema>

export const useLoginPage = ({ remoteLogin }: LoginPageProps) => {
	const { signIn } = useAuth()
	const [viewPassword, setViewPassword] = useState(false)

	const form = useHookForm<FormData>({
		defaultValues: {
			email: '',
			password: ''
		},
		resolver: zodResolver(schema)
	})

	const { handleSubmit: handleSubmitForm } = form

	const { mutateAsync, isPending } = useMutation({
		mutationFn: async (data: LoginParams) => remoteLogin.execute(data)
	})

	const onSubmit = useCallback(
		async (data: FormData, event?: React.BaseSyntheticEvent) => {
			try {
				event?.preventDefault()
				const { token } = await mutateAsync(data)
				signIn(token)
			} catch (error) {
				if (error instanceof InvalidCredentialsError) {
					toast.error('Credenciais inválidas')
					return
				}

				toast.error('Erro inesperado, tente novamente mais tarde')
			}
		},
		[mutateAsync, signIn]
	)

	const handleSubmit = handleSubmitForm(onSubmit)

	return {
		form: {
			...form,
			buttonDisabled: form.buttonDisabled || isPending
		},
		viewPassword,
		setViewPassword,
		handleSubmit
	}
}
