import { ImprovementData } from '@/data/useCases/improvement'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ImprovementDetailsModel } from '@/domain/models/improvementModel'
import type { IGetImprovement } from '@/domain/useCases/improvement'

export const makeRemoteGetImprovement = (): IGetImprovement =>
  new ImprovementData.RemoteGetImprovement(
    'properties/:propertyId/improvements',
    makeApiHttpClient<ImprovementDetailsModel>()
  )
