import { AnimalData } from '@/data/useCases/animal'
import { makeApiHttpClient } from '@/main/factories/http'

import type { AnimalDetailsModel } from '@/domain/models/animalModel'
import type { IGetAnimal } from '@/domain/useCases/animal'

export const makeRemoteGetAnimal = (): IGetAnimal =>
  new AnimalData.RemoteGetAnimal(
    'properties/:propertyId/animals',
    makeApiHttpClient<AnimalDetailsModel>()
  )
