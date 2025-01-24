import { ImprovementData } from '@/data/useCases/improvement'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IDeleteImprovement } from '@/domain/useCases/improvement'

export const makeRemoteDeleteImprovement = (): IDeleteImprovement =>
  new ImprovementData.RemoteDeleteImprovement(
    'properties/:propertyId/improvements',
    makeApiHttpClient<void>()
  )
