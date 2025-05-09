import isMobilePhone from 'validator/es/lib/isMobilePhone'

export function phoneValidation(phone: string) {
  const phoneWithoutMask = phone.replace(/\D/g, '')

  return isMobilePhone(phoneWithoutMask, 'pt-BR')
}
