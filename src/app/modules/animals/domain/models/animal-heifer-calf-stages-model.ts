import type { WithId } from '@/core/domain/types'

export type GMDStatus = 'normal' | 'overweight' | 'underweight'

export type ReproductionStatus = 'fit' | 'unfit'

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

export type AnimalHeiferCalfStageAdditionalDataApiResponse = {
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
    status: string
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
    status: string
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

export type AnimalHeiferCalfStageDetailsApiResponse = {
  weighingDate: string
  ecc: string
} & AnimalHeiferCalfStageAdditionalDataApiResponse

export type AnimalHeiferCalfStageModel = WithId<{
  weighingDate: Date
  weight: string
  ecc: string
  age: string
}>

// todo: refactor to be consistent with Api response
export type AnimalHeiferCalfStageApiResponse = WithId<{
  weighingDate: string
  weight: string
  ecc: string
  age: string
}>
