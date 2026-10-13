import { useCallback, useRef, useState } from 'react'

import {
  uploadPendingEntities,
  type UploadProgress,
} from '@/core/services/sync/sync-upload-service'

type SyncUploadState = {
  isSyncing: boolean
  progress: UploadProgress
  error: string | null
}

export function useSyncUpload() {
  const [state, setState] = useState<SyncUploadState>({
    isSyncing: false,
    progress: { current: 0, total: 0 },
    error: null,
  })
  const isSyncingRef = useRef(false)

  const triggerUpload = useCallback(async () => {
    if (isSyncingRef.current) return
    isSyncingRef.current = true
    setState((s) => ({ ...s, isSyncing: true, error: null }))
    try {
      await uploadPendingEntities((p) => {
        setState((s) => ({ ...s, progress: p }))
      })
    } catch {
      setState((s) => ({ ...s, error: 'Erro ao sincronizar dados' }))
    } finally {
      isSyncingRef.current = false
      setState((s) => ({ ...s, isSyncing: false }))
    }
  }, [])

  return { ...state, triggerUpload }
}
