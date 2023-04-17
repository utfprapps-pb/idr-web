import { Masker } from '../masker'

export const phoneMask = (value: string) => Masker.mask('99 9 9999-9999')(value)
