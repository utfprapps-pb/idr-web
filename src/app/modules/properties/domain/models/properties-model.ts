import type { FileType, Nullable, Option, WithId } from '@/core/domain/types'

export type PropertyApiResponse = WithId<{
  name: string
  city: string
  state: string
  farmer: string
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
    id?: number
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
    images: Nullable<FileType[]>
  }
}

export type PropertyDetailsApiResponse = {
  name: string
  city: string
  state: string
  farmer: string
  nakedAveragePrice: number
  leaseAveragePrice: number
  technicians: WithId<{
    user: {
      displayName: string
    }
  }>[]

  collaborators: {
    id?: number
    collaboratorName: string
    workDays: number
    workHours: number
  }[]
  area: {
    dairyCattleFarming: number
    perennialPasture: number
    summerPlowing: number
    winterPlowing: number
  }

  latitude: number
  longitude: number

  // todo: falta validar o type
  attachment: string[] | null
}
