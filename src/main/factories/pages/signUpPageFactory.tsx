import { makeRemoteGetCep } from '@/main/factories/useCases/cep'
import { makeRemoteCreateUser } from '@/main/factories/useCases/user'
import { makeSignUpValidation } from '@/main/factories/validations'
import { SignUpPage } from '@/presentation/pages'

export const MakeSignUpPage: React.FC = () => (
	<SignUpPage
		createUser={makeRemoteCreateUser()}
		getCep={makeRemoteGetCep()}
		validation={makeSignUpValidation()}
	/>
)
