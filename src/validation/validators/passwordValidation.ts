import isStrongPassword from 'validator/es/lib/isStrongPassword'

import { InvalidFieldError } from '../errors'
import { IFieldValidation } from '../protocols'

export class PasswordValidation implements IFieldValidation {
	constructor(readonly field: string) {}

	validate(input: object): Error | null {
		const [, password] =
			Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
			[]

		const passwordRules = {
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1
		}

		if (isStrongPassword(password, passwordRules)) {
			return null
		}

		return new InvalidFieldError(
			'O campo precisa ter 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo'
		)
	}
}
