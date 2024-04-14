export type PropertyModel = {
	id: string
	producer: string
	name: string
	county: {
		city: string
		state: string
	}
}

export type CreatePropertyModel = {
	generalData: {
		name: string
		city: string
		state: string
		producer: string
		nakedAveragePricePerHectare: string
		leaseAveragePricePerHectare: string
		// ToDo: Transform to Option (id, value)
		responsibleTechnicians: string[]
	}
	collaborators: {
		name: string
		hoursPerDay: string
	}
	totalArea: {
		dairyCattleFarming: string
		perennialPasture: string
		summerPlowing: string
		winterPlowing: string
	}
	localization: {
		latitude: string
		longitude: string
		images: File[]
	}
}
