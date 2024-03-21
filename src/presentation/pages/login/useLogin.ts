import { useCallback } from 'react'

import { LoginUserParams } from '@/domain/useCases'
import { useHookForm } from '@/presentation/components/ui/form/hooks/useHookForm'
import { useAuth } from '@/presentation/store'

const INITIAL_FORM_DATA: LoginUserParams = {
	email: '',
	password: ''
}

export const useLogin = () => {
	const authHookData = useAuth()
	const { handleSignIn } = authHookData

	const form = useHookForm<LoginUserParams>({
		defaultValues: INITIAL_FORM_DATA
	})

	const { buttonDisabled, handleSubmit: handleSubmitForm } = form

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
		buttonDisabled,
		handleSubmit
	}
}
