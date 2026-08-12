import axios from 'axios'

import { baseApi } from '@/core/infra/http/api-http-client/api-http-client'
import { saveReferenceData } from '@/core/lib/offline'

import type { SyncDownloadResponse } from '@/core/lib/offline/types'

function toDownloadErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401)
      return 'Sessão expirada. Faça login novamente.'
    if (error.response?.status === 403)
      return 'Sem permissão para baixar dados de campo.'
    if (!error.response)
      return 'Sem conexão. Conecte-se à internet e tente novamente.'
  }

  return 'Erro ao sincronizar dados de campo'
}

export async function downloadReferenceData(): Promise<void> {
  try {
    const response =
      await baseApi.get<SyncDownloadResponse>('/v1/sync/download')
    const { regions, cities, producers } = response.data

    await Promise.all([
      saveReferenceData('regions', regions),
      saveReferenceData('cities', cities),
      saveReferenceData('producers', producers),
    ])
  } catch (error) {
    throw new Error(toDownloadErrorMessage(error))
  }
}
