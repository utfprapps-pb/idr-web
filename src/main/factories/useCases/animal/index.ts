import { makeRemoteCreateAnimal } from './remoteCreateAnimalFactory'
import { makeRemoteDeleteAnimal } from './remoteDeleteAnimalFactory'
import { makeRemoteGetAnimal } from './remoteGetAnimalFactory'
import { makeRemoteGetAnimals } from './remoteGetAnimalsFactory'
import { makeRemoteUpdateAnimal } from './remoteUpdateAnimalFactory'

export const AnimalDataFactory = {
  makeRemoteCreateAnimal,
  makeRemoteDeleteAnimal,
  makeRemoteGetAnimal,
  makeRemoteGetAnimals,
  makeRemoteUpdateAnimal,
}
