import { CreateUserModel } from '@/domain/models'
import { ValidationBuilder } from '@/main/builders'
import { ValidationComposite } from '@/main/composite'

type ModelKeys = keyof CreateUserModel

export const makeSignUpValidation = (): {
	firstStepValidation: ValidationComposite
	validation: ValidationComposite
} => ({
	firstStepValidation: ValidationComposite.build([
		...ValidationBuilder.field<ModelKeys>('name').required().build(),
		...ValidationBuilder.field<ModelKeys>('email').required().email().build(),
		...ValidationBuilder.field<ModelKeys>('password')
			.required()
			.password()
			.build(),
		...ValidationBuilder.field<ModelKeys>('confirmPassword')
			.required()
			.sameAs<ModelKeys>('password')
			.build(),
		...ValidationBuilder.field<ModelKeys>('cpf').required().cpf().build(),
		...ValidationBuilder.field<ModelKeys>('phone').required().phone().build(),
		...ValidationBuilder.field<ModelKeys>('graduationYear')
			.required()
			.year()
			.build(),
		...ValidationBuilder.field<ModelKeys>('professionalRegister')
			.required()
			.build()
	]),
	validation: ValidationComposite.build([
		...ValidationBuilder.field<ModelKeys>('name').required().build(),
		...ValidationBuilder.field<ModelKeys>('email').required().email().build(),
		...ValidationBuilder.field<ModelKeys>('password')
			.required()
			.password()
			.build(),
		...ValidationBuilder.field<ModelKeys>('confirmPassword')
			.required()
			.sameAs<ModelKeys>('password')
			.build(),
		...ValidationBuilder.field<ModelKeys>('cpf').required().cpf().build(),
		...ValidationBuilder.field<ModelKeys>('phone').required().phone().build(),
		...ValidationBuilder.field<ModelKeys>('graduationYear')
			.required()
			.year()
			.build(),
		...ValidationBuilder.field<ModelKeys>('professionalRegister')
			.required()
			.build(),
		...ValidationBuilder.field<ModelKeys>('cep').required().build(),
		...ValidationBuilder.field<ModelKeys>('street').required().build(),
		...ValidationBuilder.field<ModelKeys>('city').required().build(),
		...ValidationBuilder.field<ModelKeys>('houseNumber').required().build()
	])
})
