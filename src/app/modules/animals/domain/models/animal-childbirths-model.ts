import type { Option } from '@/core/domain/types'

export type AnimalChildbirthCondition = 'ALIVE' | 'DEAD'

export type AnimalChildbirthGender = 'MALE' | 'FEMALE'

export type AnimalChildbirthDetailsModel = {
  date: Date | null
  /** `''`: a API devolveu nulo (não informado). */
  gender: AnimalChildbirthGender | ''
  weight: string
  /** `''`: a API devolveu nulo (não informado). */
  condition: AnimalChildbirthCondition | ''
  breed: Option<string>
  /** Vínculo opcional com o bezerro; `value: ''` quando ele não faz parte do rebanho. */
  calf: Option<string>
}

/** Formato real da API (`GetAnimalChildbirthByIdOutput` = `ListAnimalChildbirthOutput`), usado no GET e em cada item da busca. */
export type AnimalChildbirthApiResponse = {
  id: string
  animalId: string
  childbirthDate: string | null
  /** Sexo e condição a API aceita nulos. */
  gender: AnimalChildbirthGender | null
  weight: number | null
  condition: AnimalChildbirthCondition | null
  breedId: string
  calfId: string | null
  breedName: string | null
  calfIdentifier: string | null
}

export type AnimalChildbirthModel = {
  id: string
  date: string
  gender: string
  weight: string
  condition: string
  breed: string
}
