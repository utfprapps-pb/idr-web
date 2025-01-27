import { useContext } from 'react'

import { MachineContext } from '../contexts/machineContext'

export const useMachineContext = () => {
  const context = useContext(MachineContext)

  if (!context) {
    throw new Error('useMachineContext should be used within <MachineProvider>')
  }

  return context
}
