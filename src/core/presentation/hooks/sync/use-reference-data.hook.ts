import { useCallback, useEffect, useState } from 'react'

import { getReferenceData } from '@/core/lib/offline'

import type { ReferenceCity, ReferenceProducer } from '@/core/lib/offline/types'

type OfflineReferenceData = {
  isOnline: boolean
  cities: ReferenceCity[]
  producers: ReferenceProducer[]
}

export function useReferenceData(): OfflineReferenceData {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [cities, setCities] = useState<ReferenceCity[]>([])
  const [producers, setProducers] = useState<ReferenceProducer[]>([])

  const loadOfflineData = useCallback(async () => {
    const [offlineCities, offlineProducers] = await Promise.all([
      getReferenceData<ReferenceCity>('cities'),
      getReferenceData<ReferenceProducer>('producers'),
    ])
    setCities(offlineCities)
    setProducers(offlineProducers)
  }, [])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => {
      setIsOnline(false)
      loadOfflineData()
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    if (!navigator.onLine) {
      loadOfflineData()
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [loadOfflineData])

  return { isOnline, cities, producers }
}
