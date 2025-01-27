import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { MachineDataFactory } from '@/main/factories/useCases/machine'

import type { MachineFilters, MachineSort } from '../types'

type Props = {
  propertyId: string
  filters: MachineFilters
  page: number
  sort?: MachineSort
}

export const useMachines = ({ propertyId, filters, page, sort }: Props) => {
  const getMachines = MachineDataFactory.makeRemoteGetMachines()

  const {
    data,
    isError,
    isLoading,
    refetch: refetchMachines,
  } = useQuery({
    queryKey: ['machines', { page, sort, filters }],
    queryFn: () =>
      getMachines.execute({
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
