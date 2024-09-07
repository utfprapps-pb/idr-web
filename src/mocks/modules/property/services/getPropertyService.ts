import { faker } from '@faker-js/faker/locale/pt_PT'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

import propertiesData from '../../../../../database/propertiesData.json'

import type { PropertyDetailsModel } from '@/domain/models/propertyModel'

export const getPropertyService = httpWithMiddleware<
	PathParams<'id'>,
	never,
	PropertyDetailsModel
>({
	routePath: '/api/properties/:id',
	method: 'get',
	middlewares: [withDelay(), withAuth],
	resolver: async ({ params }) => {
		if (!propertiesData.length)
			return HttpResponse.json({} as PropertyDetailsModel, {
				status: 404
			})

		const propertyFound = propertiesData.find(
			(property) => property.id === String(params.id)
		)

		if (!propertyFound)
			return HttpResponse.json({} as PropertyDetailsModel, {
				status: 404
			})

		const images = await Promise.all(
			Array.from({ length: 3 }, async () => {
				const url = faker.image.url()
				const response = await fetch(url)
				const blob = await response.blob()
				return {
					name: 'image-1',
					preview: url,
					file: new File([blob], '', { type: blob.type })
				}
			})
		)

		return HttpResponse.json(
			{
				general: {
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
						() => ({
							value: faker.string.uuid(),
							label: faker.person.fullName()
						})
					)
				},
				collaborators: Array.from({ length: 5 }, () => ({
					id: faker.string.uuid(),
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
