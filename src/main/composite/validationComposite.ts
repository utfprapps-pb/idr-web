import { flattenObject } from '../utils'

import type { ErrorDef, IValidation, Validate } from '@/presentation/protocols'
import type { IFieldValidation } from '@/validation/protocols'

export class ValidationComposite implements IValidation {
	private constructor(private readonly validators: IFieldValidation[]) {}

	static build(validators: IFieldValidation[]): ValidationComposite {
		return new ValidationComposite(validators)
	}

	validate: Validate = ({ data }) => {
		const flattenedData = flattenObject(data)

		let errors: ErrorDef = {}

		for (const fieldName of Object.keys(flattenedData)) {
			const validators = this.validators.filter(
				(validator) => validator.field === fieldName
			)

			for (const validator of validators) {
				const error = validator.validate({
					[fieldName]: flattenedData[fieldName]
				})

				if (error) {
					errors = { ...errors, [fieldName]: { message: error.message } }
				}
			}
		}

		return {
			errors,
			values: data
		}
	}
}
