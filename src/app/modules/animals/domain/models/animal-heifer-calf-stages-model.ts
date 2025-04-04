import type { WithId } from '@/core/domain/types'

export type GMDStatus = 'normal' | 'overweight' | 'underweight'

type ReproductionStatus = 'fit' | 'unfit'

export type AnimalHeiferCalfStageAdditionalDataModel = {
  age: {
    years: string
    months: string
  }
  weighing: {
    last: string
    current: string
  }
  ageWeightEstimate: {
    min: string
    max: string
  }
  gmd: {
    min: string
    max: string
    real: string
    status: GMDStatus
  }
  amountOfMilk: {
    correction: string
    morning: string
    afternoon: string
  }
  weaningDate: {
    first: Date
    second: Date
  }
  removeLittleHouseDate: Date
  amountOfEstimateConcentrate: {
    correction: string
    heifer: string
    calf: string
  }
  bulky: string
  dateToProvideSilage: Date
  reproduction: {
    status: ReproductionStatus
    minWeight: string
    fromDate: Date
    carriedOut: Date
    artificialInseminationNumber: string
  }
}

export type AnimalHeiferCalfStageDetailsModel = {
  weighingDate: Date
  ecc: string
} & AnimalHeiferCalfStageAdditionalDataModel

export type AnimalHeiferCalfStageModel = WithId<{
  weighingDate: Date
  weight: string
  ecc: string
  age: string
}>
