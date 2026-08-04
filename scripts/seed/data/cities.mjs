import { faker } from '@faker-js/faker/locale/pt_BR'

import { regionsData } from './regions.mjs'

export const citiesDependencies = ['regions']

const findRegion = (description) =>
  regionsData.find((region) => region.description === description)

const CITY_NAMES_BY_REGION = {
  Sudoeste: [
    'Pato Branco',
    'Francisco Beltrão',
    'Dois Vizinhos',
    'Clevelândia',
    'Ampére',
  ],
  Oeste: ['Cascavel', 'Foz do Iguaçu', 'Toledo'],
  Metropolitana: ['Curitiba'],
  'Norte Central': ['Londrina', 'Maringá'],
  'Centro-Sul': ['Guarapuava'],
}

export const citiesData = Object.entries(CITY_NAMES_BY_REGION).flatMap(
  ([regionDescription, names]) => {
    const region = findRegion(regionDescription)

    return names.map((name) => ({
      id: faker.string.uuid(),
      name: `${name} - PR - ${regionDescription}`,
      state: 'PR',
      region: { id: region.id, name: region.description },
    }))
  }
)
