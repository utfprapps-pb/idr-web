import type { WithId } from '@/core/domain/types'

type AnimalChildBirthCondition = 'HEALTHY' | 'DEAD'

type AnimalChildBirthGender = 'MASCULINE' | 'FEMININE'

export type AnimalChildBirthDetailsModel = {
  date: Date
  gender: AnimalChildBirthGender
  weight: string
  condition: AnimalChildBirthCondition
  breed: string
}

export type AnimalChildBirthModel = WithId<{
  date: string
  gender: AnimalChildBirthGender
  weight: string
  condition: AnimalChildBirthCondition
  breed: string
}>
