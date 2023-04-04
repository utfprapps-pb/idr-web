import React from 'react'

import { useSignUp } from './useSignUp'
import { CreateUserModel } from '@/domain/models'
import { CreateUser } from '@/domain/useCases'
import { ValidationComposite } from '@/main/composite'
import {
	Button,
	InputGroup,
	Loading,
	TextField
} from '@/presentation/components'
import { useHandleChangeFormData } from '@/presentation/hooks'
import { AuthContainerTemplate } from '@/presentation/templates'

type SignUpPageProps = {
	createUser: CreateUser
	validation: ValidationComposite
}

export const SignUpPage: React.FC<SignUpPageProps> = ({
	createUser,
	validation
}) => {
	const {
		touched,
		loading,
		formData,
		setFormData,
		handleSubmit,
		handleValidate
	} = useSignUp({
		createUser,
		validation
	})
	const { handleChange } = useHandleChangeFormData<CreateUserModel>({
		formData,
		setFormData
	})

	return (
		<AuthContainerTemplate
			title="Registre se agora na plataforma"
			description="Preencha o formulário abaixo para criar sua conta"
			body={
				<>
					<InputGroup>
						<TextField
							label="Nome"
							placeholder="Digite seu nome"
							value={formData.name}
							onChange={handleChange('name')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('name')}
						/>

						<TextField
							label="E-mail"
							placeholder="Digite seu e-mail"
							value={formData.email}
							onChange={handleChange('email')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('email')}
						/>
					</InputGroup>

					<InputGroup>
						<TextField
							label="Celular"
							placeholder="Digite seu número de celular"
							value={formData.phone}
							onChange={handleChange('phone')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('phone')}
						/>

						<TextField
							label="Nº da casa"
							placeholder="Digite o número da sua casa"
							value={formData.houseNumber}
							onChange={handleChange('houseNumber')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('houseNumber')}
						/>
					</InputGroup>

					<InputGroup>
						<TextField
							label="Ano de Graduação"
							placeholder="Digite o ano de sua graduação"
							value={formData.graduationYear}
							onChange={handleChange('graduationYear')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('graduationYear')}
						/>

						<TextField
							label="Registro Profissional"
							placeholder="Digite seu registro profissional"
							value={formData.professionalRegister}
							onChange={handleChange('professionalRegister')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('professionalRegister')}
						/>
					</InputGroup>
				</>
			}
			footer={
				<>
					<Button type="submit" disabled={loading}>
						{loading ? <Loading /> : 'Entrar'}
					</Button>
					<Button type="submit" disabled={loading} theme="outline">
						Esqueci a senha
					</Button>
				</>
			}
			handleSubmit={handleSubmit}
		/>
	)
}
