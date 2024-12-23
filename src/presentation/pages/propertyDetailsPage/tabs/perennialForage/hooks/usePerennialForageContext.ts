import { useContext } from 'react'

import { PerennialForageContext } from '../contexts/perennialForageContext'

export const usePerennialForageContext = () => {
  const context = useContext(PerennialForageContext)

  if (!context) {
    throw new Error(
      'usePerennialForageContext should be used within <PerennialForageProvider>'
    )
  }

  return context
}
