import { baseApi } from '@/core/infra/http/api-http-client/api-http-client'
import { saveReferenceData } from '@/core/lib/offline'

import type { SyncDownloadResponse } from '@/core/lib/offline/types'

export async function downloadReferenceData(): Promise<void> {
  const response = await baseApi.get<SyncDownloadResponse>('/v1/sync/download')
  const { regions, cities, producers } = response.data

  await Promise.all([
    saveReferenceData('regions', regions),
    saveReferenceData('cities', cities),
    saveReferenceData('producers', producers),
  ])
}
