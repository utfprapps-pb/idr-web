import isMobilePhone from 'validator/es/lib/isMobilePhone'

import { InvalidFieldError } from '../errors'
import { FieldValidation } from '../protocols'

export class PhoneValidation implements FieldValidation {
	constructor(readonly field: string) {}

	validate(input: object): Error | null {
		const [, phone] =
			Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
			[]

		const phoneWithoutMask = phone.replace(/\D/g, '')

		if (isMobilePhone(phoneWithoutMask, 'pt-BR')) {
			return null
		}

		return new InvalidFieldError(
			'O campo precisa ser um número de celular válido'
		)
	}
}
