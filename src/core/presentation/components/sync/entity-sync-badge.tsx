import { Badge } from '@/core/presentation/components/ui'
import { cn } from '@/core/utils'

import type { PendingEntityStatus } from '@/core/lib/offline/types'

type EntitySyncBadgeProps = {
  status: Extract<PendingEntityStatus, 'pending' | 'error'>
  className?: string
}

export function EntitySyncBadge({ status, className }: EntitySyncBadgeProps) {
  return (
    <Badge
      variant={status === 'error' ? 'destructive' : 'secondary'}
      className={cn(
        status === 'pending' && 'bg-amber-100 text-amber-800',
        className
      )}
    >
      {status === 'pending' ? 'Pendente' : 'Erro de sync'}
    </Badge>
  )
}

EntitySyncBadge.displayName = 'EntitySyncBadge'
