import { BreedData } from '@/data/useCases/breed'
import { makeApiHttpClient } from '@/main/factories/http'

import type { Option } from '@/domain/shared/types'
import type { IGetAllBreeds } from '@/domain/useCases/breed'

export const makeRemoteGetAllBreeds = (): IGetAllBreeds =>
  new BreedData.RemoteGetAllBreeds('breeds/all', makeApiHttpClient<Option[]>())
