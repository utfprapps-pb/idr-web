import React from 'react'

import { EnvelopeSimple, LockKey } from 'phosphor-react'

import { useLogin } from './useLogin'
import { LoginUserParams } from '@/domain/useCases'
import {
	Button,
	Loading,
	PasswordInput,
	TextField
} from '@/presentation/components'
import { useHandleChangeFormData } from '@/presentation/hooks'
import { AuthContainerTemplate } from '@/presentation/templates'

export const LoginPage: React.FC = () => {
	const { loading, formData, setFormData, handleSubmit } = useLogin()
	const { handleChange } = useHandleChangeFormData<LoginUserParams>({
		formData,
		setFormData
	})

	return (
		<AuthContainerTemplate
			title="Bem vindo!"
			description="Digite seus dados para continuar"
			body={
				<>
					<TextField
						label="E-mail"
						placeholder="Digite seu e-mail"
						value={formData.username}
						onChange={handleChange('username')}
						disabled={loading}
						iconsStart={[<EnvelopeSimple key={EnvelopeSimple.displayName} />]}
					/>

					<PasswordInput
						label="Senha"
						placeholder="Digite sua senha"
						value={formData.password}
						onChange={handleChange('password')}
						disabled={loading}
						iconsStart={[<LockKey key={LockKey.displayName} />]}
					/>
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
