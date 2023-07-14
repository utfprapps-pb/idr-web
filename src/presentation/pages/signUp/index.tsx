import React from 'react'

import { SignUpPageProps } from './types'
import { useSignUp } from './useSignUp'
import { CreateUserModel } from '@/domain/models'
import { cepMask, cpfMask, onlyNumbersMask, phoneMask } from '@/masker'
import {
	DebounceTextField,
	InputGroup,
	PasswordInput,
	TextField
} from '@/presentation/components/form'
import { Button, Loading } from '@/presentation/components/ui'
import { useHandleChangeFormData } from '@/presentation/hooks'
import { AuthContainerTemplate } from '@/presentation/templates'

export const SignUpPage: React.FC<SignUpPageProps> = (props) => {
	const {
		cepLoading,
		formData,
		loading,
		touched,
		goToLoginPage,
		handleFetchCep,
		handleSubmit,
		handleValidate,
		setFormData
	} = useSignUp(props)
	const { handleChange } = useHandleChangeFormData<CreateUserModel>({
		formData,
		setFormData
	})

	return (
		<AuthContainerTemplate
			title="Registre se agora na plataforma"
			description="Preencha o formulário abaixo para criar sua conta"
			maxWidth="980px"
			body={
				<>
					<InputGroup>
						<TextField.Root
							value={formData.name}
							touched={touched}
							onChange={handleChange('name')}
							validator={handleValidate('name')}
						>
							<TextField.Label label="Nome" />
							<TextField.InputContainer>
								<TextField.Icons isWithError position="right" />
								<TextField.Input
									disabled={loading}
									placeholder="Digite seu nome"
								/>
							</TextField.InputContainer>
							<TextField.Error />
						</TextField.Root>

						<TextField.Root
							value={formData.email}
							onChange={handleChange('email')}
							touched={touched}
							validator={handleValidate('email')}
						>
							<TextField.Label label="Email" />
							<TextField.InputContainer>
								<TextField.Icons isWithError position="right" />
								<TextField.Input
									disabled={loading}
									placeholder="Digite seu email"
								/>
							</TextField.InputContainer>
							<TextField.Error />
						</TextField.Root>
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
						<TextField.Root
							value={formData.cpf}
							onChange={handleChange('cpf')}
							touched={touched}
							validator={handleValidate('cpf')}
							mask={cpfMask}
						>
							<TextField.Label label="CPF" />
							<TextField.InputContainer>
								<TextField.Icons isWithError position="right" />
								<TextField.Input
									disabled={loading}
									placeholder="Digite seu CPF"
								/>
							</TextField.InputContainer>
							<TextField.Error />
						</TextField.Root>

						<TextField.Root
							value={formData.phone}
							onChange={handleChange('phone')}
							touched={touched}
							validator={handleValidate('phone')}
							mask={phoneMask}
						>
							<TextField.Label label="Celular" />
							<TextField.InputContainer>
								<TextField.Icons isWithError position="right" />
								<TextField.Input
									disabled={loading}
									placeholder="Digite seu número de celular"
								/>
							</TextField.InputContainer>
							<TextField.Error />
						</TextField.Root>

						<TextField.Root
							value={formData.professionalRegister}
							onChange={handleChange('professionalRegister')}
							touched={touched}
							validator={handleValidate('professionalRegister')}
							mask={onlyNumbersMask}
						>
							<TextField.Label label="Registro Profissional" />
							<TextField.InputContainer>
								<TextField.Icons isWithError position="right" />
								<TextField.Input
									disabled={loading}
									placeholder="Digite seu registro profissional"
								/>
							</TextField.InputContainer>
							<TextField.Error />
						</TextField.Root>

						<TextField.Root
							value={formData.graduationYear}
							onChange={handleChange('graduationYear')}
							touched={touched}
							validator={handleValidate('graduationYear')}
							mask={onlyNumbersMask}
						>
							<TextField.Label label="Ano de Graduação" />
							<TextField.InputContainer>
								<TextField.Icons isWithError position="right" />
								<TextField.Input
									disabled={loading}
									placeholder="Digite o ano de sua graduação"
								/>
							</TextField.InputContainer>
							<TextField.Error />
						</TextField.Root>
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

						<TextField.Root
							value={formData.street}
							onChange={handleChange('street')}
							touched={touched}
							validator={handleValidate('street')}
						>
							<TextField.Label label="Rua" />
							<TextField.InputContainer>
								<TextField.Icons isWithError position="right" />
								<TextField.Input
									disabled={loading}
									placeholder="Digite seu endereço"
								/>
							</TextField.InputContainer>
							<TextField.Error />
						</TextField.Root>

						<TextField.Root
							value={formData.city}
							onChange={handleChange('city')}
							touched={touched}
							validator={handleValidate('city')}
						>
							<TextField.Label label="Cidade" />
							<TextField.InputContainer>
								<TextField.Icons isWithError position="right" />
								<TextField.Input
									disabled={loading}
									placeholder="Digite sua cidade"
								/>
							</TextField.InputContainer>
							<TextField.Error />
						</TextField.Root>

						<TextField.Root
							value={formData.houseNumber}
							onChange={handleChange('houseNumber')}
							touched={touched}
							validator={handleValidate('houseNumber')}
						>
							<TextField.Label label="Nº da casa" />
							<TextField.InputContainer>
								<TextField.Icons isWithError position="right" />
								<TextField.Input
									disabled={loading}
									placeholder="Digite o número da sua casa"
								/>
							</TextField.InputContainer>
							<TextField.Error />
						</TextField.Root>
					</InputGroup>
				</>
			}
			footer={
				<>
					<Button.Root>
						<Button.Container type="submit" disabled={loading}>
							{loading ? <Loading /> : 'Cadastrar'}
						</Button.Container>
					</Button.Root>

					<Button.Root>
						<Button.Container
							onClick={goToLoginPage}
							disabled={loading}
							theme="outline"
						>
							Voltar para o login
						</Button.Container>
					</Button.Root>
				</>
			}
			handleSubmit={handleSubmit}
		/>
	)
}
