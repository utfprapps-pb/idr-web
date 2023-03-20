import { InvalidFieldError } from '../errors/invalidFieldError'
import { FieldValidation } from '@/validation/protocols'

export class CompareFieldsValidation implements FieldValidation {
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
			return new InvalidFieldError()
		}

		return null
	}
}
