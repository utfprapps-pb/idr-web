import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { makeRemoteGetMachinesUseCase } from '../../../main/factories/use-cases'

import type { MachineFilters, MachineSort } from '../../types'

type Props = {
  propertyId: string
  filters: MachineFilters
  page: number
  sort?: MachineSort
}

export function useMachinesQuery({ propertyId, filters, page, sort }: Props) {
  const getMachinesUseCase = makeRemoteGetMachinesUseCase()

  const {
    data,
    isError,
    isLoading,
    refetch: refetchMachines,
  } = useQuery({
    queryKey: ['machines', { page, sort, filters }],
    queryFn: () =>
      getMachinesUseCase.execute({
        propertyId,
        queryParams: {
          pagination: { page },
          sort,
          filters,
        },
      }),
  })

  useEffect(() => {
    if (isError) toast.error('Erro ao buscar máquinas')
  }, [isError])

  return {
    machines: data ?? {
      resources: [],
      totalPages: 1,
    },
    isLoading,
    refetchMachines,
  }
}
