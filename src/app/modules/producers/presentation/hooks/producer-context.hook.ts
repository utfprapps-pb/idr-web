import { useContext } from 'react'

import { ProducerContext } from '../contexts/producer-context'

export function useProducerContext() {
  const context = useContext(ProducerContext)

  if (!context) {
    throw new Error(
      'useProducerContext should be used within <ProducerProvider>'
    )
  }

  return context
}
