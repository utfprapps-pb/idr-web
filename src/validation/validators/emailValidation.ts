import isEmail from 'validator/es/lib/isEmail'

export const emailValidation = (email: string) => isEmail(email)
