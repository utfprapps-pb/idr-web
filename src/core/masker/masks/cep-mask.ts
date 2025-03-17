import { Masker } from '../masker'

export function cepMask(value: string) {
  const masker = Masker.mask('99999-999')
  return masker(value)
}
