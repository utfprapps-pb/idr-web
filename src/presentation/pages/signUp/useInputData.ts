import { useState } from 'react'

import { Eye, EyeOff, Mail } from 'lucide-react'

import { CreateUserModel } from '@/domain/models'
import { InputDataGrouped } from '@/main/factories/components'
import { cepMask, cpfMask, onlyNumbersMask, phoneMask } from '@/masker'

import { UseInputDataProps } from './types'

export const useInputData = ({
	cepLoading,
	cepDebounceCallback,
	handleOnClearCepDebounce
}: UseInputDataProps) => {
	const [viewPassword, setViewPassword] = useState(false)
	const [viewConfirmPassword, setViewConfirmPassword] = useState(false)

	const inputDataFirstStep: InputDataGrouped<CreateUserModel>[] = [
		{
			key: 'name-email-group',
			group: [
				{
					name: 'name',
					label: 'Nome *',
					placeholder: 'Digite seu nome'
				},
				{
					name: 'email',
					label: 'Email *',
					placeholder: 'Digite seu email',
					iconsStart: [
						{
							key: Mail.displayName ?? 'Mail',
							icon: Mail
						}
					]
				}
			]
		},
		{
			key: 'password-group',
			group: [
				{
					name: 'password',
					label: 'Senha *',
					placeholder: 'Digite uma senha forte',
					type: viewPassword ? 'text' : 'password',
					iconsEnd: [
						{
							key: viewPassword
								? EyeOff.displayName ?? 'EyeOff'
								: Eye.displayName ?? 'Eye',
							icon: viewPassword ? EyeOff : Eye,
							onClick: () => setViewPassword((oldValue) => !oldValue)
						}
					]
				},
				{
					name: 'confirmPassword',
					label: 'Confirmar Senha *',
					placeholder: 'Repita a senha',
					type: viewConfirmPassword ? 'text' : 'password',
					iconsEnd: [
						{
							key: viewConfirmPassword
								? EyeOff.displayName ?? 'EyeOff'
								: Eye.displayName ?? 'Eye',
							icon: viewConfirmPassword ? EyeOff : Eye,
							onClick: () => setViewConfirmPassword((oldValue) => !oldValue)
						}
					]
				}
			]
		},
		{
			key: 'cpf-phone-group',
			group: [
				{
					name: 'cpf',
					label: 'CPF *',
					placeholder: 'Digite seu CPF',
					mask: cpfMask
				},
				{
					name: 'phone',
					label: 'Celular *',
					placeholder: 'Digite o número do seu celular',
					mask: phoneMask
				}
			]
		},
		{
			key: 'professionalRegister-graduationYear-group',
			group: [
				{
					name: 'professionalRegister',
					label: 'Registro Profissional *',
					placeholder: 'Digite seu registro profissional',
					mask: onlyNumbersMask
				},
				{
					name: 'graduationYear',
					label: 'Ano de Graduação *',
					placeholder: 'Digite o ano de graduação',
					mask: onlyNumbersMask
				}
			]
		}
	]

	const inputDataSecondStep: InputDataGrouped<CreateUserModel>[] = [
		{
			key: 'cep-street-group',
			group: [
				{
					name: 'cep',
					label: 'CEP *',
					placeholder: 'Digite seu CEP',
					mask: cepMask,
					debounce: 500,
					debounceCallback: cepDebounceCallback,
					handleOnClearDebounce: handleOnClearCepDebounce
				},
				{
					name: 'street',
					label: 'Rua *',
					placeholder: 'Digite seu endereço',
					disabled: cepLoading,
					loading: cepLoading
				}
			]
		},
		{
			key: 'city-number-group',
			group: [
				{
					name: 'city',
					label: 'Cidade *',
					placeholder: 'Digite sua cidade',
					disabled: cepLoading,
					loading: cepLoading
				},
				{
					name: 'houseNumber',
					label: 'Número da casa',
					placeholder: 'Digite o número da casa'
				}
			]
		}
	]

	return {
		inputDataFirstStep,
		inputDataSecondStep
	}
}
