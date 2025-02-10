import { AnimalData } from '@/data/useCases/animal'
import { makeApiHttpClient } from '@/main/factories/http'

import type { AnimalModel } from '@/domain/models/animalModel'
import type { IGetAnimals } from '@/domain/useCases/animal'

export const makeRemoteGetAnimals = (): IGetAnimals =>
  new AnimalData.RemoteGetAnimals(
    'properties/:propertyId/animals',
    makeApiHttpClient<AnimalModel[]>()
  )
