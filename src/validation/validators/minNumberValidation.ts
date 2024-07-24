import { onlyNumbersMask } from '@/masker'

import { InvalidFieldError } from '../errors'
import { IFieldValidation } from '../protocols'

export class MinNumberValidation implements IFieldValidation {
	constructor(
		readonly field: string,
		private readonly minValue: number
	) {}

	validate(input: object): Error | null {
		const [, value] =
			Object.entries(input).find(([fieldName]) => fieldName === this.field) ||
			[]

		const onlyNumber = Number(onlyNumbersMask(value))

		if (onlyNumber >= this.minValue) return null

		return new InvalidFieldError()
	}
}
