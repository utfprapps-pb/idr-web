import type { Option, WithId } from '@/core/domain/types'

type AnimalChildBirthCondition = 'ALIVE' | 'DEAD'

type AnimalChildBirthGender = 'MALE' | 'FEMALE'

export type AnimalChildBirthDetailsModel = {
  date: Date
  gender: AnimalChildBirthGender
  weight: string
  condition: AnimalChildBirthCondition
  breed: Option
}

export type AnimalChildBirthModel = WithId<{
  date: string
  gender: string
  weight: string
  condition: string
  breed: string
}>
