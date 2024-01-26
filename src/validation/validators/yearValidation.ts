import { InvalidFieldError } from '../errors'
import { IFieldValidation } from '../protocols'

export class YearValidation implements IFieldValidation {
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
