import { SignUpPage } from '@/presentation/pages'

import { CepDataFactory } from '../useCases/cep'
import { UserDataFactory } from '../useCases/user'

export const MakeSignUpPage: React.FC = () => (
	<SignUpPage
		createUser={UserDataFactory.makeRemoteCreate()}
		getCep={CepDataFactory.makeRemoteGetOne()}
	/>
)
