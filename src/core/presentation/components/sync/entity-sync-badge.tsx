import { cn } from '@/core/utils'

import type { PendingEntityStatus } from '@/core/lib/offline/types'

type EntitySyncBadgeProps = {
  status: Extract<PendingEntityStatus, 'pending' | 'error'>
  className?: string
}

export function EntitySyncBadge({ status, className }: EntitySyncBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
        status === 'pending' && 'bg-amber-100 text-amber-800',
        status === 'error' && 'bg-red-100 text-red-800',
        className
      )}
    >
      {status === 'pending' ? 'Pendente' : 'Erro de sync'}
    </span>
  )
}

EntitySyncBadge.displayName = 'EntitySyncBadge'
