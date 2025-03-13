import isEmail from 'validator/es/lib/isEmail'

export function emailValidation(email: string) {
  return isEmail(email)
}
