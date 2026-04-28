import type { Option, WithId } from '@/core/domain/types'

export type ForageAvailabilityDetailsModel = {
  date: Date
  forage: Option
  entranceCm: string
  residueCm: string
  kgPerSquareMeter: string
  paddockArea: string
  efficiencyPercent: string
  numberOfCows: string
}

export type ForageAvailabilityDetailsApiResponse = {
  date: string
  forage: Option
  entranceCm: number
  residueCm: number
  kgPerSquareMeter: number
  paddockArea: number
  efficiencyPercent: number
  numberOfCows: number
}

export type ForageAvailabilityModel = WithId<{
  date: Date
  forage: string
  entranceCm: string
  residueCm: string
  kgPerSquareMeter: string
  paddockArea: string
  efficiencyPercent: string
  numberOfCows: string
}>

export type ForageAvailabilityApiResponse = WithId<{
  date: string
  forage: string
  entranceCm: number
  residueCm: number
  kgPerSquareMeter: number
  paddockArea: number
  efficiencyPercent: number
  numberOfCows: number
}>
