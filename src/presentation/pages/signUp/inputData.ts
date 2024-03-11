import { InputDataGrouped } from '@/main/factories/components'
import { cepMask, cpfMask, onlyNumbersMask, phoneMask } from '@/masker'

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
				placeholder: 'Digite uma senha forte',
				type: 'password'
			},
			{
				name: 'confirmPassword',
				label: 'Confirmar Senha',
				placeholder: 'Repita a senha',
				type: 'password'
			}
		]
	},
	{
		key: 'cpf-phone-group',
		group: [
			{
				name: 'cpf',
				label: 'CPF',
				placeholder: 'Digite seu CPF',
				mask: cpfMask
			},
			{
				name: 'phone',
				label: 'Celular',
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
				label: 'Registro Profissional',
				placeholder: 'Digite seu registro profissional',
				mask: onlyNumbersMask
			},
			{
				name: 'graduationYear',
				label: 'Ano de Graduação',
				placeholder: 'Digite o ano de graduação',
				mask: onlyNumbersMask
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
				placeholder: 'Digite seu CEP',
				mask: cepMask
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
				placeholder: 'Digite o número da casa',
				mask: onlyNumbersMask
			}
		]
	}
]
