import type { WithId } from '@/core/domain/types'

type GMDStatus = 'normal' | 'overweight' | 'underweight'

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
    last: string
    current: string
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
    first: string
    second: string
  }
  removeLittleHouseDate: string
  amountOfEstimateConcentrate: {
    correction: string
    heifer: string
    calf: string
  }
  bulky: string
  dateToProvideSilage: string
  reproduction: {
    status: ReproductionStatus
    minWeight: string
    fromDate: string
    carriedOut: string
    artificialInseminationNumber: string
  }
}

export type AnimalHeiferCalfStageDetailsModel = {
  weighingDate: Date
  ecc: string
} & AnimalHeiferCalfStageAdditionalDataModel

export type AnimalHeiferCalfStageModel = WithId<{
  weighingDate: string
  weight: string
  ecc: string
  age: string
}>
