import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetMachineUseCase } from '../../../main/factories/use-cases'

type Props = {
  id: number
  propertyId: number
}

export function useMachineQuery({ id, propertyId }: Props) {
  const getMachineUseCase = makeRemoteGetMachineUseCase()

  const {
    data: machine,
    isError,
    isLoading,
    refetch: refetchMachine,
  } = useQuery({
    queryKey: ['machine', propertyId, id],
    enabled: !!propertyId && !!id,
    queryFn: () =>
      getMachineUseCase.execute({
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
