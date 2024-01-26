import { IFieldValidation } from '@/validation/protocols'

import { InvalidFieldError } from '../errors/invalidFieldError'

export class CompareFieldsValidation implements IFieldValidation {
	constructor(
		readonly field: string,
		private readonly fieldToCompare: string
	) {}

	validate(input: object): Error | null {
		const [, value] =
			Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
			[]

		const [, valueToCompare] =
			Object.entries(input).find(
				([fieldName]) => fieldName === this.fieldToCompare
			) || []

		if (value !== valueToCompare) {
			return new InvalidFieldError('Os campos precisam ser iguais')
		}

		return null
	}
}
