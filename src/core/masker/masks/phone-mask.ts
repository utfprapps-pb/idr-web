import { Masker } from '../masker'

export function phoneMask(value: string) {
  const masker = Masker.mask('99 9 9999-9999')
  return masker(value)
}
