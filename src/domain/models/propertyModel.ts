import type { FileType, Option } from '@/domain/shared'

export type PropertyModel = {
	id: string
	producer: string
	name: string
	county: {
		city: string
		state: string
	}
}

export type PropertyDetailsModel = {
	generalData: {
		name: string
		city: string
		state: string
		producer: string
		nakedAveragePricePerHectare: string
		leaseAveragePricePerHectare: string
		responsibleTechnicians: Option[]
	}
	collaborators: {
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
