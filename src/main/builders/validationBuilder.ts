import { IFieldValidation } from '@/validation/protocols'
import {
	CompareFieldsValidation,
	CpfValidation,
	EmailValidation,
	MinLengthValidation,
	PasswordValidation,
	PhoneValidation,
	RequiredFieldValidation,
	YearValidation
} from '@/validation/validators'

export class ValidationBuilder {
	private constructor(
		private readonly fieldName: string,
		private readonly validations: IFieldValidation[]
	) {}

	static field<T extends string = string>(fieldName: T): ValidationBuilder {
		return new ValidationBuilder(fieldName, [])
	}

	required(): ValidationBuilder {
		this.validations.push(new RequiredFieldValidation(this.fieldName))
		return this
	}

	email(): ValidationBuilder {
		this.validations.push(new EmailValidation(this.fieldName))
		return this
	}

	min(length: number): ValidationBuilder {
		this.validations.push(new MinLengthValidation(this.fieldName, length))
		return this
	}

	sameAs<T extends string = string>(fieldToCompare: T): ValidationBuilder {
		this.validations.push(
			new CompareFieldsValidation(this.fieldName, fieldToCompare)
		)
		return this
	}

	password(): ValidationBuilder {
		this.validations.push(new PasswordValidation(this.fieldName))
		return this
	}

	phone(): ValidationBuilder {
		this.validations.push(new PhoneValidation(this.fieldName))
		return this
	}

	year(): ValidationBuilder {
		this.validations.push(new YearValidation(this.fieldName))
		return this
	}

	cpf(): ValidationBuilder {
		this.validations.push(new CpfValidation(this.fieldName))
		return this
	}

	build(): IFieldValidation[] {
		return this.validations
	}
}
