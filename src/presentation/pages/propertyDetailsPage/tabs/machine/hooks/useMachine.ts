import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { MachineDataFactory } from '@/main/factories/useCases/machine'

type Props = {
  id: string
  propertyId: string
}

export const useMachine = ({ id, propertyId }: Props) => {
  const getMachine = MachineDataFactory.makeRemoteGetMachine()

  const {
    data: machine,
    isError,
    isLoading,
    refetch: refetchMachine,
  } = useQuery({
    queryKey: ['machine', id],
    queryFn: () =>
      getMachine.execute({
        propertyId,
        machineId: id,
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar máquina')
  }, [isError])

  return {
    machine,
    isLoading,
    refetchMachine,
  }
}
