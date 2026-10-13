import { useContext } from 'react'

import { RegionContext } from '../contexts/region-context'

export function useRegionContext() {
  const context = useContext(RegionContext)

  if (!context) {
    throw new Error('useRegionContext must be used within a <RegionProvider>')
  }

  return context
}
