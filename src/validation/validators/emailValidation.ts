import isEmail from 'validator/es/lib/isEmail'

import { InvalidFieldError } from '../errors'
import { FieldValidation } from '../protocols'

export class EmailValidation implements FieldValidation {
	constructor(readonly field: string) {}

	validate(input: object): Error | null {
		const [, email] =
			Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
			[]

		if (isEmail(email)) {
			return null
		}

		return new InvalidFieldError()
	}
}
