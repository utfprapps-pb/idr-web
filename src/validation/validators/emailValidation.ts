import isEmail from 'validator/es/lib/isEmail'

import { InvalidFieldError } from '../errors'
import { IFieldValidation } from '../protocols'

export class EmailValidation implements IFieldValidation {
	constructor(readonly field: string) {}

	validate(input: object): Error | null {
		const [, email] =
			Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
			[]

		if (isEmail(email)) {
			return null
		}

		return new InvalidFieldError('Email inválido')
	}
}
