import { RequiredFieldError } from '../errors'
import { IFieldValidation } from '../protocols'

export class RequiredFieldValidation implements IFieldValidation {
	constructor(readonly field: string) {}

	validate(input: object): Error | null {
		const [, value] =
			Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
			[]

		if (value) return null

		return new RequiredFieldError()
	}
}
