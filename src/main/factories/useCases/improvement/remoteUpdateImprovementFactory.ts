import { ImprovementData } from '@/data/useCases/improvement'
import { makeApiHttpClient } from '@/main/factories/http'

import type { IUpdateImprovement } from '@/domain/useCases/improvement'

export const makeRemoteUpdateImprovement = (): IUpdateImprovement =>
  new ImprovementData.RemoteUpdateImprovement(
    'properties/:propertyId/improvements',
    makeApiHttpClient<void>()
  )
