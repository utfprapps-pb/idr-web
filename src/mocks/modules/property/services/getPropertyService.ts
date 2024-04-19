import { faker } from '@faker-js/faker/locale/pt_PT'
import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { PropertyDetailsModel } from '@/domain/models'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

import propertiesData from '../../../../../database/propertiesData.json'

export const getPropertyService = httpWithMiddleware<
	PathParams<string>,
	never,
	PropertyDetailsModel
>({
	routePath: '/api/properties',
	method: 'get',
	middlewares: [withDelay(), withAuth],
	resolver: async ({ params: id }) => {
		if (!propertiesData.length)
			return HttpResponse.json({} as PropertyDetailsModel, {
				status: 404
			})

		const propertyFound = propertiesData.find(
			(property) => property.id === String(id)
		)

		if (!propertyFound)
			return HttpResponse.json({} as PropertyDetailsModel, {
				status: 404
			})

		const images = await Promise.all(
			Array.from({ length: 3 }, async () => {
				const response = await fetch(faker.image.url())
				const blob = await response.blob()
				return new File([blob], 'image.png', { type: blob.type })
			})
		)

		return HttpResponse.json(
			{
				id: propertyFound.id,
				generalData: {
					name: propertyFound.name,
					producer: propertyFound.producer,
					city: propertyFound.city,
					state: propertyFound.state,
					leaseAveragePricePerHectare: faker.finance.amount(),
					nakedAveragePricePerHectare: faker.finance.amount(),
					responsibleTechnicians: Array.from(
						{
							length: 3
						},
						() => ({ id: faker.string.uuid(), value: faker.person.fullName() })
					)
				},
				collaborators: Array.from({ length: 5 }, () => ({
					name: faker.person.fullName(),
					hoursPerDay: String(faker.number.int({ min: 1, max: 8 }))
				})),
				localization: {
					images,
					latitude: String(faker.location.latitude()),
					longitude: String(faker.location.longitude())
				},
				totalArea: {
					dairyCattleFarming: String(faker.number.float({ min: 1, max: 20 })),
					perennialPasture: String(faker.number.float({ min: 1, max: 20 })),
					summerPlowing: String(faker.number.float({ min: 1, max: 20 })),
					winterPlowing: String(faker.number.float({ min: 1, max: 20 }))
				}
			},
			{ status: HttpStatusCode.ok }
		)
	}
})
