import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteCityUseCase } from '../../../main/factories/use-cases'
import { useCityContext } from '../../hooks/city-context.hook'

export function CityDeleteDialog() {
  const deleteCityUseCase = makeRemoteDeleteCityUseCase()

  const { citySelected, isOpenDeleteCityContainer, closeDeleteCityContainer } =
    useCityContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteCity } = useMutation({
    mutationFn: deleteCityUseCase.execute,
  })

  const handleDeleteCity = useCallback(async () => {
    try {
      if (!citySelected?.id) {
        toast.error('Não foi possível remover essa cidade')
        return
      }

      await mutateHandleDeleteCity(citySelected.id)

      queryClient.invalidateQueries({ queryKey: ['cities'], exact: false })

      toast.success('Cidade removida com sucesso')
      closeDeleteCityContainer()
    } catch {
      toast.error('Não foi possível remover essa cidade')
    }
  }, [
    mutateHandleDeleteCity,
    citySelected,
    queryClient,
    closeDeleteCityContainer,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteCityContainer}
      onOpenChange={closeDeleteCityContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a cidade ${citySelected?.name}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={() => handleDeleteCity()}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

CityDeleteDialog.displayName = 'CityDeleteDialog'
