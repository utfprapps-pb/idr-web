import type { FileType, Option, WithId } from '@/core/domain/types'

export type PropertyApiResponse = WithId<{
  name: string
  user: {
    displayName: string
  }
}>

export type PropertyModel = WithId<{
  producer: string
  name: string
  county: {
    city: string
    state: string
  }
}>

export type PropertyDetailsModel = {
  general: {
    name: string
    city: string
    state: string
    producer: string
    nakedAveragePricePerHectare: string
    leaseAveragePricePerHectare: string
    responsibleTechnicians: Option[]
  }
  collaborators: {
    id?: string
    name: string
    hoursPerDay: string
  }[]
  totalArea: {
    dairyCattleFarming: string
    perennialPasture: string
    summerPlowing: string
    winterPlowing: string
  }
  localization: {
    latitude: string
    longitude: string
    images: FileType[]
  }
}

export type PropertyDetailsApiResponse = {
  general: {
    name: string
    city: string
    state: string
    producer: string
    nakedAveragePricePerHectare: string
    leaseAveragePricePerHectare: string
    responsibleTechnicians: Option[]
  }
  collaborators: {
    id?: string
    name: string
    hoursPerDay: string
  }[]
  totalArea: {
    dairyCattleFarming: string
    perennialPasture: string
    summerPlowing: string
    winterPlowing: string
  }
  localization: {
    latitude: string
    longitude: string
    images: string[]
  }
}
