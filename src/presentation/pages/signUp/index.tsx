import React from 'react'

import { SignUpPageProps } from './types'
import { useSignUp } from './useSignUp'
import { CreateUserModel } from '@/domain/models'
import { ROUTES } from '@/main/routes/routes'
import { cepMask, cpfMask, onlyNumbersMask, phoneMask } from '@/masker'
import {
	Button,
	DebounceTextField,
	InputGroup,
	Loading,
	PasswordInput,
	TextField
} from '@/presentation/components'
import { useHandleChangeFormData, useIdrHistory } from '@/presentation/hooks'
import { AuthContainerTemplate } from '@/presentation/templates'

export const SignUpPage: React.FC<SignUpPageProps> = (props) => {
	const {
		touched,
		loading,
		cepLoading,
		formData,
		setFormData,
		handleSubmit,
		handleValidate,
		handleFetchCep
	} = useSignUp(props)
	const { handleChange } = useHandleChangeFormData<CreateUserModel>({
		formData,
		setFormData
	})
	const { navigate } = useIdrHistory()

	return (
		<AuthContainerTemplate
			title="Registre se agora na plataforma"
			description="Preencha o formulário abaixo para criar sua conta"
			maxWidth="980px"
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
						<PasswordInput
							label="Senha"
							placeholder="Digite uma senha forte"
							value={formData.password}
							onChange={handleChange('password')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('password')}
							validationDependency={formData.confirmPassword}
						/>

						<PasswordInput
							label="Confirmar senha"
							placeholder="Repita a senha"
							value={formData.confirmPassword}
							onChange={handleChange('confirmPassword')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('confirmPassword')}
						/>
					</InputGroup>

					<InputGroup>
						<TextField
							label="CPF"
							placeholder="Digite seu CPF"
							value={formData.cpf}
							onChange={handleChange('cpf')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('cpf')}
							mask={cpfMask}
						/>

						<TextField
							label="Celular"
							placeholder="Digite seu número de celular"
							value={formData.phone}
							onChange={handleChange('phone')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('phone')}
							mask={phoneMask}
						/>

						<TextField
							label="Registro Profissional"
							placeholder="Digite seu registro profissional"
							value={formData.professionalRegister}
							onChange={handleChange('professionalRegister')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('professionalRegister')}
							mask={onlyNumbersMask}
						/>

						<TextField
							label="Ano de Graduação"
							placeholder="Digite o ano de sua graduação"
							value={formData.graduationYear}
							onChange={handleChange('graduationYear')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('graduationYear')}
							mask={onlyNumbersMask}
						/>
					</InputGroup>

					<InputGroup>
						<DebounceTextField
							label="CEP"
							placeholder="Digite seu CEP"
							value={formData.cep}
							onChange={handleChange('cep')}
							callback={() => handleFetchCep(formData.cep)}
							callbackLoading={cepLoading}
							disabled={loading}
							touched={touched}
							validator={handleValidate('cep')}
							mask={cepMask}
						/>

						<TextField
							label="Rua"
							placeholder="Digite seu endereço"
							value={formData.street}
							onChange={handleChange('street')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('street')}
						/>

						<TextField
							label="Cidade"
							placeholder="Digite sua cidade"
							value={formData.city}
							onChange={handleChange('city')}
							disabled={loading}
							touched={touched}
							validator={handleValidate('city')}
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
				</>
			}
			footer={
				<>
					<Button type="submit" disabled={loading}>
						{loading ? <Loading /> : 'Criar conta'}
					</Button>
					<Button
						onClick={() => navigate(ROUTES.login.path())}
						disabled={loading}
						theme="outline"
					>
						Voltar para o login
					</Button>
				</>
			}
			handleSubmit={handleSubmit}
		/>
	)
}
