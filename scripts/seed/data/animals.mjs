import { faker } from '@faker-js/faker/locale/pt_BR'

import { allBreedsData } from './breeds.mjs'

// Mesmos valores das listas do formulário (planilha e PDF p. 24).
const BREED_TYPES = ['Pequena', 'Média', 'Grande', 'Holandês-Zebu', 'Bubalina']
const GENDERS = ['Fêmea', 'Macho']
const BORN_CONDITIONS = ['Vivo', 'Morto']

const optional = (value) =>
  faker.datatype.boolean({ probability: 0.8 }) ? value : null

const animals = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    identifier: faker.lorem.word(),
    breedId: faker.helpers.arrayElement(allBreedsData).id,
    type: optional(faker.helpers.arrayElement(BREED_TYPES)),
    gender: optional(faker.helpers.arrayElement(GENDERS)),
    bornCondition: optional(faker.helpers.arrayElement(BORN_CONDITIONS)),
    bornDate: optional(
      faker.date.past({ years: 8 }).toISOString().slice(0, 10)
    ),
    bornWeight: optional(
      faker.number.float({ min: 20, max: 50, fractionDigits: 2 })
    ),
    animalMotherId: null,
    currentWeight: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    ecc: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
  })
)

// Parte dos animais aponta para outro animal do seed como mãe.
animals.forEach((animal, index) => {
  if (index > 0 && faker.datatype.boolean({ probability: 0.3 })) {
    animal.animalMotherId =
      animals[faker.number.int({ min: 0, max: index - 1 })].id
  }
})

export const animalsData = animals
