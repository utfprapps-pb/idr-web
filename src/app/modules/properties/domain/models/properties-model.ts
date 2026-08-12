import type { FileType, Option } from '@/core/domain/types'

export type PropertyApiResponse = {
  id: string
  name: string
  producerId: string
  cityId: string
}

export type PropertyModel = {
  id: string
  name: string
}

export type PropertyDetailsModel = {
  general: {
    name: string
    cityId: Option<string>
    producerId: Option<string>
    nakedAveragePricePerHectare: string
    leaseAveragePricePerHectare: string
    responsibleTechnicians: Option<string>[]
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
  id: string
  name: string
  nakedAveragePrice: number
  leaseAveragePrice: number
  dairyCattleFarmingArea: number
  perennialPastureArea: number
  summerPlowingArea: number
  winterPlowingArea: number
  latitude: number
  longitude: number
  producer: {
    id: string
    name: string
  }
  city: {
    id: string
    name: string
  }
  technicians: {
    id: string
    name: string
  }[]
  collaborators: {
    id: string
    name: string
    hoursPerDay: string
  }[]
  attachments: {
    id: string
    fileName: string
    contentType: string
    sizeBytes: number
  }[]
}
