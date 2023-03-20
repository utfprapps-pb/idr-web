import { InvalidFieldError } from '../errors'
import { FieldValidation } from '../protocols'

export class MinLengthValidation implements FieldValidation {
	constructor(readonly field: string, private readonly minLength: number) {}

	validate(input: object): Error | null {
		const [, value] =
			Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
			[]

		if (value.length >= this.minLength) return null

		return new InvalidFieldError()
	}
}
