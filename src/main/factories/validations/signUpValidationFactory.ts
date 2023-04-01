import { CreateUserModel } from '@/domain/models'
import { ValidationBuilder } from '@/main/builders'
import { ValidationComposite } from '@/main/composite'

type ModelKeys = keyof CreateUserModel

export const makeSignUpValidation = (): ValidationComposite =>
	ValidationComposite.build([
		...ValidationBuilder.field<ModelKeys>('name').required().build(),
		...ValidationBuilder.field<ModelKeys>('email').required().email().build(),
		...ValidationBuilder.field<ModelKeys>('phone').required().phone().build(),
		...ValidationBuilder.field<ModelKeys>('houseNumber').required().build(),
		...ValidationBuilder.field<ModelKeys>('graduationYear')
			.required()
			.year()
			.build(),
		...ValidationBuilder.field<ModelKeys>('professionalRegister')
			.required()
			.build()
	])
