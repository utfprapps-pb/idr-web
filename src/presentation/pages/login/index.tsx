import React from 'react'

import { EnvelopeSimple, LockKey } from 'phosphor-react'

import { useLogin } from './useLogin'
import { LoginUserParams } from '@/domain/useCases'
import { ROUTES } from '@/main/routes'
import { PasswordInput, TextField } from '@/presentation/components/form'
import { Button, Loading } from '@/presentation/components/ui'
import { useHandleChangeFormData, useIdrHistory } from '@/presentation/hooks'
import { AuthContainerTemplate } from '@/presentation/templates'

export const LoginPage: React.FC = () => {
	const { loading, formData, setFormData, handleSubmit } = useLogin()
	const { handleChange } = useHandleChangeFormData<LoginUserParams>({
		formData,
		setFormData
	})
	const { navigate } = useIdrHistory()

	return (
		<AuthContainerTemplate
			title="Bem vindo!"
			description="Digite seus dados para continuar"
			maxWidth="540px"
			body={
				<>
					<TextField.Root
						value={formData.email}
						onChange={handleChange('email')}
					>
						<TextField.Label label="Email" />
						<TextField.InputContainer>
							<TextField.Icons position="left">
								<TextField.Icon icon={EnvelopeSimple} />
							</TextField.Icons>
							<TextField.Input
								disabled={loading}
								placeholder="Digite seu email"
							/>
						</TextField.InputContainer>
					</TextField.Root>

					<PasswordInput
						label="Senha"
						placeholder="Digite sua senha"
						value={formData.password}
						onChange={handleChange('password')}
						disabled={loading}
						iconsStart={[
							{
								icon: LockKey,
								key: LockKey.displayName
							}
						]}
					/>
				</>
			}
			footer={
				<>
					<Button.Root>
						<Button.Container type="submit" disabled={loading}>
							{loading ? <Loading /> : 'Entrar'}
						</Button.Container>
					</Button.Root>

					<Button.Root>
						<Button.Container
							onClick={() => navigate(ROUTES.signUp.path())}
							disabled={loading}
							theme="outline"
						>
							Nova conta
						</Button.Container>
					</Button.Root>

					<Button.Root>
						<Button.Container disabled={loading} theme="text">
							Esqueci a senha
						</Button.Container>
					</Button.Root>
				</>
			}
			handleSubmit={handleSubmit}
		/>
	)
}
