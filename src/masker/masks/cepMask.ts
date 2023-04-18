import { Masker } from '../masker'

export const cepMask = (value: string) => Masker.mask('99999-999')(value)
