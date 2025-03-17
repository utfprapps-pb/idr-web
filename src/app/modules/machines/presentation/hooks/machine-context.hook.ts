import { useContext } from 'react'

import { MachineContext } from '../contexts/machine-context'

export function useMachineContext() {
  const context = useContext(MachineContext)

  if (!context) {
    throw new Error('useMachineContext should be used within <MachineProvider>')
  }

  return context
}
