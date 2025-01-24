import { ImprovementData } from '@/data/useCases/improvement'
import { makeApiHttpClient } from '@/main/factories/http'

import type { ImprovementModel } from '@/domain/models/improvementModel'
import type { IGetImprovements } from '@/domain/useCases/improvement'

export const makeRemoteGetImprovements = (): IGetImprovements =>
  new ImprovementData.RemoteGetImprovements(
    'properties/:propertyId/improvements',
    makeApiHttpClient<ImprovementModel[]>()
  )
