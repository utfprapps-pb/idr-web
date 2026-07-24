import { createContext, useEffect, type PropsWithChildren } from 'react'

import { useSyncUpload } from '@/core/presentation/hooks/sync/use-sync-upload.hook'

import type { UploadProgress } from '@/core/services/sync/sync-upload-service'

export type SyncContextValue = {
  isSyncing: boolean
  progress: UploadProgress
  error: string | null
  triggerUpload: () => Promise<void>
}

export const SyncContext = createContext<SyncContextValue | null>(null)

export function SyncProvider({ children }: PropsWithChildren) {
  const syncUpload = useSyncUpload()
  const { triggerUpload } = syncUpload

  useEffect(() => {
    if (navigator.onLine) {
      triggerUpload()
    }

    const handleOnline = () => {
      triggerUpload()
    }
    window.addEventListener('online', handleOnline)
    return () => window.removeEventListener('online', handleOnline)
  }, [triggerUpload])

  return (
    <SyncContext.Provider value={syncUpload}>{children}</SyncContext.Provider>
  )
}
