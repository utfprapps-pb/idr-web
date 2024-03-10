import { InputDataGrouped } from './types'

export const inputDataFirstStep: InputDataGrouped[] = [
	{
		key: 'name-email-group',
		group: [
			{
				name: 'name',
				label: 'Nome',
				placeholder: 'Digite seu nome'
			},
			{
				name: 'email',
				label: 'Email',
				placeholder: 'Digite seu email'
			}
		]
	},
	{
		key: 'password-group',
		group: [
			{
				name: 'password',
				label: 'Senha',
				placeholder: 'Digite uma senha forte'
			},
			{
				name: 'confirmPassword',
				label: 'Confirmar Senha',
				placeholder: 'Repita a senha'
			}
		]
	},
	{
		key: 'cpf-phone-group',
		group: [
			{
				name: 'cpf',
				label: 'CPF',
				placeholder: 'Digite seu CPF'
			},
			{
				name: 'phone',
				label: 'Celular',
				placeholder: 'Digite o número do seu celular'
			}
		]
	},
	{
		key: 'professionalRegister-graduationYear-group',
		group: [
			{
				name: 'professionalRegister',
				label: 'Registro Profissional',
				placeholder: 'Digite seu registro profissional'
			},
			{
				name: 'graduationYear',
				label: 'Ano de Graduação',
				placeholder: 'Digite o ano de graduação'
			}
		]
	}
]

export const inputDataSecondStep: InputDataGrouped[] = [
	{
		key: 'cep-street-group',
		group: [
			{
				name: 'cep',
				label: 'CEP',
				placeholder: 'Digite seu CEP'
			},
			{
				name: 'street',
				label: 'Rua',
				placeholder: 'Digite seu endereço'
			}
		]
	},
	{
		key: 'city-number-group',
		group: [
			{
				name: 'city',
				label: 'Cidade',
				placeholder: 'Digite sua cidade'
			},
			{
				name: 'houseNumber',
				label: 'Número da casa',
				placeholder: 'Digite o número da casa'
			}
		]
	}
]
