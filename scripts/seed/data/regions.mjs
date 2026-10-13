import { faker } from '@faker-js/faker/locale/pt_BR'

const REGION_DESCRIPTIONS = [
  'Sudoeste',
  'Oeste',
  'Metropolitana',
  'Norte Central',
  'Centro-Sul',
  'Noroeste',
  'Norte Pioneiro',
]

export const regionsData = REGION_DESCRIPTIONS.map((description) => ({
  id: faker.string.uuid(),
  description,
}))
