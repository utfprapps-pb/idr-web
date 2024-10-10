import isStrongPassword from 'validator/es/lib/isStrongPassword'

export const passwordValidation = (password: string) => {
	const passwordRules = {
		minLength: 8,
		minLowercase: 1,
		minUppercase: 1,
		minNumbers: 1,
		minSymbols: 1,
	}

	return isStrongPassword(password, passwordRules)
}
