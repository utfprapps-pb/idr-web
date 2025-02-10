import { AnimalData } from '@/data/useCases/animal'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IDeleteAnimal } from '@/domain/useCases/animal'

export const makeRemoteDeleteAnimal = (): IDeleteAnimal =>
  new AnimalData.RemoteDeleteAnimal(
    'properties/:propertyId/animals',
    makeApiHttpClient<void>()
  )
