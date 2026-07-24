import { useCallback, useEffect, useState } from 'react'

import axios from 'axios'
import toast from 'react-hot-toast'

import { getCacheTimestamp } from '@/core/lib/offline'
import { downloadReferenceData } from '@/core/services/sync'

export function useSyncDownload() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null)

  useEffect(() => {
    getCacheTimestamp('cities').then(setLastSyncedAt)
  }, [])

  const triggerDownload = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)
    setError(null)

    try {
      await downloadReferenceData()
      const ts = await getCacheTimestamp('cities')
      setLastSyncedAt(ts)
      toast.success('Dados de campo sincronizados com sucesso')
    } catch (err) {
      let message = 'Erro ao sincronizar dados de campo'
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401)
          message = 'Sessão expirada. Faça login novamente.'
        else if (err.response?.status === 403)
          message = 'Sem permissão para baixar dados de campo.'
        else if (!err.response)
          message = 'Sem conexão. Conecte-se à internet e tente novamente.'
      }
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  return { isLoading, error, lastSyncedAt, triggerDownload }
}
