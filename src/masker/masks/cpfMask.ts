import { Masker } from '../masker'

export const cpfMask = (value: string) => Masker.mask('999.999.999-99')(value)
