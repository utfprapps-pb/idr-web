import { useEffect, useState } from 'react'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { CACHE_TTL_MS, getCacheTimestamp } from '@/core/lib/offline'

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
    return (
      <span className="text-sm text-slate-500">
        Dados de campo: <strong className="text-red-500">Não baixados</strong>
      </span>
    )
  }

  const formattedDate = lastSyncedAt
    ? format(new Date(lastSyncedAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
    : ''

  if (state === 'expired') {
    return (
      <span className="text-sm text-amber-600">
        ⚠ Dados desatualizados — baixados em {formattedDate}
      </span>
    )
  }

  return (
    <span className="text-sm text-green-600">
      ✓ Dados atualizados em {formattedDate}
    </span>
  )
}

CacheStatusBadge.displayName = 'CacheStatusBadge'
