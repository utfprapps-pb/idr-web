import { useCallback, useState } from 'react'

import { LoginUserParams } from '@/domain/useCases'
import { useHookForm } from '@/presentation/hooks/useHookForm'
import { useAuth } from '@/presentation/store'

const INITIAL_FORM_DATA: LoginUserParams = {
	email: '',
	password: ''
}

export const useLoginPage = () => {
	const { handleSignIn } = useAuth()

	const [viewPassword, setViewPassword] = useState(false)

	const form = useHookForm<LoginUserParams>({
		defaultValues: INITIAL_FORM_DATA
	})

	const { handleSubmit: handleSubmitForm } = form

	const onSubmit = useCallback(
		async (data: LoginUserParams, event?: React.BaseSyntheticEvent) => {
			event?.preventDefault()
			await handleSignIn(data)
		},
		[handleSignIn]
	)

	const handleSubmit = handleSubmitForm(onSubmit)

	return {
		form,
		viewPassword,
		setViewPassword,
		handleSubmit
	}
}
