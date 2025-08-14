import type { Option, WithId } from '@/core/domain/types'

export type AnimalChildbirthCondition = 'ALIVE' | 'DEAD'

export type AnimalChildbirthGender = 'MALE' | 'FEMALE'

export type AnimalChildbirthDetailsModel = {
  date: Date
  gender: AnimalChildbirthGender
  weight: string
  condition: AnimalChildbirthCondition
  breed: Option
}

export type AnimalChildbirthDetailsApiResponse = {
  date: string
  gender: string
  weight: string
  condition: string
  breed: Option
}

export type AnimalChildbirthModel = WithId<{
  date: string
  gender: string
  weight: string
  condition: string
  breed: string
}>

export type AnimalChildbirthApiResponse = AnimalChildbirthModel
