import { useEffect, useState } from 'react'

import { CheckCircle2Icon, CloudIcon, Loader2Icon } from 'lucide-react'

import { getPendingEntityCount } from '@/core/lib/offline'
import { useSyncContext } from '@/core/presentation/hooks/sync/use-sync-context.hook'

export function GlobalSyncIndicator() {
  const { isSyncing, progress } = useSyncContext()
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    const load = () => getPendingEntityCount().then(setPendingCount)
    load()
    const onOnline = () => setTimeout(load, 2000)
    window.addEventListener('online', onOnline)
    window.addEventListener('offline', load)
    window.addEventListener('pending-entities:changed', load)
    return () => {
      window.removeEventListener('online', onOnline)
      window.removeEventListener('offline', load)
      window.removeEventListener('pending-entities:changed', load)
    }
  }, [])

  if (isSyncing) {
    return (
      <div className="flex items-center gap-1.5 text-sm text-slate-600">
        <Loader2Icon size={14} className="animate-spin" />
        <span>
          Sincronizando
          {progress.total > 1
            ? ` ${progress.current}/${progress.total} batches...`
            : '...'}
        </span>
      </div>
    )
  }

  if (pendingCount > 0) {
    return (
      <div className="flex items-center gap-1.5 text-sm text-amber-600">
        <CloudIcon size={14} />
        <span>
          {pendingCount}{' '}
          {pendingCount === 1 ? 'item pendente' : 'itens pendentes'}
        </span>
      </div>
    )
  }

  if (pendingCount === 0) {
    return (
      <div className="flex items-center gap-1.5 text-sm text-slate-400">
        <CheckCircle2Icon size={14} />
      </div>
    )
  }

  return null
}

GlobalSyncIndicator.displayName = 'GlobalSyncIndicator'
