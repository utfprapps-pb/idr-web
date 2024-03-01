import { ErrorDef, IValidation, Validate } from '@/presentation/protocols'
import { IFieldValidation } from '@/validation/protocols'

export class ValidationComposite implements IValidation {
	private constructor(private readonly validators: IFieldValidation[]) {}

	static build(validators: IFieldValidation[]): ValidationComposite {
		return new ValidationComposite(validators)
	}

	validate: Validate = ({ data }) => {
		const fields = Object.keys(data)

		let errors: ErrorDef = {}

		for (const fieldName of fields) {
			const validators = this.validators.filter(
				(validator) => validator.field === fieldName
			)

			for (const validator of validators) {
				const error = validator.validate(data)

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
