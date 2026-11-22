import { faker } from '@faker-js/faker/locale/pt_BR'

/** Catálogo `GET /products/search` no formato da API do backend. */
const categories = [
  'Antibiótico',
  'Antiparasitário',
  'Anti-inflamatório',
  'Vacina',
  'Vitamina',
].map((description) => ({ id: faker.string.uuid(), description }))

const activePrinciples = [
  'Ivermectina',
  'Oxitetraciclina',
  'Penicilina',
  'Flunixina meglumina',
  'Doramectina',
  'Cloxacilina',
  'Vitamina ADE',
].map((name) => ({ id: faker.string.uuid(), name }))

export const productsData = Array.from({ length: 40 }, () => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  activePrinciple: faker.helpers.arrayElement(activePrinciples),
  category: faker.helpers.arrayElement(categories),
}))
