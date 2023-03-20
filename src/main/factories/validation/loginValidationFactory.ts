import { ValidationBuilder } from '@/main/builders'
import { ValidationComposite } from '@/main/composite'

export const makeLoginValidation = (): ValidationComposite =>
	ValidationComposite.build([
		...ValidationBuilder.field('username').required().email().build(),
		// ToDo @Minozzzi: implement cpf validations
		...ValidationBuilder.field('cpf').build()
	])
