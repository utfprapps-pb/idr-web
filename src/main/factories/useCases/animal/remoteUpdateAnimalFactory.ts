import { AnimalData } from '@/data/useCases/animal'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IUpdateAnimal } from '@/domain/useCases/animal'

export const makeRemoteUpdateAnimal = (): IUpdateAnimal =>
  new AnimalData.RemoteUpdateAnimal(
    'properties/:propertyId/animals',
    makeApiHttpClient<void>()
  )
