import type { Option, WithId } from '@/core/domain/types'

type AnimalChildbirthCondition = 'ALIVE' | 'DEAD'

type AnimalChildbirthGender = 'MALE' | 'FEMALE'

export type AnimalChildbirthDetailsModel = {
  date: Date
  gender: AnimalChildbirthGender
  weight: string
  condition: AnimalChildbirthCondition
  breed: Option
}

export type AnimalChildbirthModel = WithId<{
  date: string
  gender: string
  weight: string
  condition: string
  breed: string
}>
