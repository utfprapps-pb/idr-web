import { Masker } from '../masker'

export function cpfMask(value: string) {
  const masker = Masker.mask('999.999.999-99')
  return masker(value)
}
