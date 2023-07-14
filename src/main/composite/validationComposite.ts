import { Validation } from '@/presentation/protocols'
import { FieldValidation } from '@/validation/protocols'

export class ValidationComposite implements Validation {
	private constructor(private readonly validators: FieldValidation[]) {}

	static build(validators: FieldValidation[]): ValidationComposite {
		return new ValidationComposite(validators)
	}

	validate(params: { fieldName: string; input: object }): string | null {
		const { fieldName, input } = params

		const validators = this.validators.filter(
			(validator) => validator.field === fieldName
		)

		for (const validator of validators) {
			const error = validator.validate(input)

			if (error) {
				return error.message
			}
		}

		return null
	}
}
