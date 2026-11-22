import { faker } from '@faker-js/faker/locale/pt_BR'

import { productsData } from './products.mjs'

export const animalMedicationsDependencies = ['products']

/**
 * Registros no formato da API do backend (sem `animalId`, que vem da rota do
 * mock). Parte usa um produto do catálogo (nome e princípio ativo copiados
 * dele, como o servidor grava); o resto é produto não cadastrado.
 */
function product() {
  if (faker.datatype.boolean()) {
    const { id, name, activePrinciple } =
      faker.helpers.arrayElement(productsData)

    return {
      productId: id,
      productName: name,
      activePrinciple: activePrinciple.name,
    }
  }

  return {
    productId: null,
    productName: faker.commerce.productName(),
    activePrinciple:
      faker.helpers.maybe(() => faker.science.chemicalElement().name) ?? null,
  }
}

export const animalMedicationsData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    ...product(),
    applicationDate: faker.date.past().toISOString().slice(0, 10),
    appliedDose: faker.number.float({ min: 1, max: 1000 }).toFixed(2),
    applicationWay: faker.helpers.arrayElement([
      'IV',
      'IM',
      'SC',
      'IntraMammary',
      'PourOn',
    ]),
  })
)
