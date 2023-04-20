import React from 'react'

import { makeRemoteCreateUser } from '@/main/factories/useCases/user'
import { makeSignUpValidation } from '@/main/factories/validations'
import { SignUpPage } from '@/presentation/pages'

export const MakeSignUpPage: React.FC = () => (
	<SignUpPage
		createUser={makeRemoteCreateUser()}
		validation={makeSignUpValidation()}
	/>
)
