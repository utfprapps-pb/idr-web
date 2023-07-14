import { InvalidFieldError } from '../errors'
import { FieldValidation } from '../protocols'

export class YearValidation implements FieldValidation {
	constructor(readonly field: string) {}

	validate(input: object): Error | null {
		const [, year] =
			Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
			[]

		const yearAsNumber = Number(year)

		if (yearAsNumber >= 1900 && yearAsNumber <= new Date().getFullYear())
			return null

		return new InvalidFieldError('O ano inserido é inválido')
	}
}
