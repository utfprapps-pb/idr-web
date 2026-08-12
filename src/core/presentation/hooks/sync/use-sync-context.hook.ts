import { useContext } from 'react'

import { SyncContext } from '@/core/providers/sync-provider'

export function useSyncContext() {
  const ctx = useContext(SyncContext)
  if (!ctx) throw new Error('useSyncContext must be used inside SyncProvider')
  return ctx
}
