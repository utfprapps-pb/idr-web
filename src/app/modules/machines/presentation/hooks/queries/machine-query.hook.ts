import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetMachineUseCase } from '../../../main/factories/use-cases'

type Props = {
  id: string
  propertyId: string
}

export function useMachineQuery({ id, propertyId }: Props) {
  const getMachineUseCase = makeRemoteGetMachineUseCase()

  const {
    data: machine,
    isError,
    isLoading,
    refetch: refetchMachine,
  } = useQuery({
    queryKey: ['machine', id],
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
