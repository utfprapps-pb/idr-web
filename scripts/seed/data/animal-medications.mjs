import { faker } from '@faker-js/faker/locale/pt_BR'

import { eventsPerAnimal } from './animal-events.mjs'
import { productsData } from './products.mjs'

export const animalMedicationsDependencies = ['products', 'animals']

/**
 * Registros no formato da API do backend, cada um de um animal do seed.
 * Parte usa um produto do catálogo (nome e princípio ativo copiados dele,
 * como o servidor grava); o resto é produto não cadastrado.
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

export const animalMedicationsData = eventsPerAnimal(4, () => ({
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
}))
