import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { CACHE_TTL_MS, getCacheTimestamp } from '@/core/lib/offline'
import { Badge } from '@/core/presentation/components/ui'

type CacheState = 'absent' | 'valid' | 'expired'

export function CacheStatusBadge() {
  const [state, setState] = useState<CacheState>('absent')
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null)

  useEffect(() => {
    async function check() {
      const ts = await getCacheTimestamp('cities')
      if (!ts) {
        setState('absent')
        return
      }
      setLastSyncedAt(ts)
      setState(Date.now() - ts >= CACHE_TTL_MS ? 'expired' : 'valid')
    }
    check()
    window.addEventListener('reference-data:changed', check)
    return () => window.removeEventListener('reference-data:changed', check)
  }, [])

  if (state === 'absent') {
    return <Badge variant="destructive">Dados de campo: Não baixados</Badge>
  }

  const formattedDate = lastSyncedAt
    ? format(new Date(lastSyncedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
    : ''

  if (state === 'expired') {
    return (
      <Badge variant="secondary" className="bg-amber-100 text-amber-800">
        ⚠ Dados desatualizados — baixados em {formattedDate}
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className="bg-green-100 text-green-800">
      ✓ Dados atualizados em {formattedDate}
    </Badge>
  )
}

CacheStatusBadge.displayName = 'CacheStatusBadge'
