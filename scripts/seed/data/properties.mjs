import { faker } from '@faker-js/faker/locale/pt_BR'

export const propertiesData = Array.from(
	{
		length: faker.number.int({
			min: 1,
			max: 100
		})
	},
	() => ({
		id: faker.string.uuid(),
		name: faker.company.name(),
		city: faker.location.city(),
		state: faker.location.state(),
		producer: faker.person.fullName()
	})
)
