import { ImprovementData } from '@/data/useCases/improvement'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ICreateImprovement } from '@/domain/useCases/improvement'

export const makeRemoteCreateImprovement = (): ICreateImprovement =>
  new ImprovementData.RemoteCreateImprovement(
    'properties/:propertyId/improvements',
    makeApiHttpClient<void>()
  )
