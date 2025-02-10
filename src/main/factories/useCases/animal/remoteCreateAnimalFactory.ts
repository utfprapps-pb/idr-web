import { AnimalData } from '@/data/useCases/animal'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ICreateAnimal } from '@/domain/useCases/animal'

export const makeRemoteCreateAnimal = (): ICreateAnimal =>
  new AnimalData.RemoteCreateAnimal(
    'properties/:propertyId/animals',
    makeApiHttpClient<void>()
  )
