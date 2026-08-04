import { useCallback, useEffect, useState } from 'react'

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
      const message =
        err instanceof Error
          ? err.message
          : 'Erro ao sincronizar dados de campo'
      setError(message)
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  return { isLoading, error, lastSyncedAt, triggerDownload }
}
