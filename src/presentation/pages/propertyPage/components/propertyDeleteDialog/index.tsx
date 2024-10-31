import React from 'react'

import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/presentation/components/ui'

import { usePropertyContext } from '../../hooks/usePropertyContext'

export const PropertyDeleteDialog: React.FC = () => {
  const {
    propertySelected,
    isOpenDeletePropertyContainer,
    deleteProperty,
    closeDeletePropertyContainer,
  } = usePropertyContext()

  const { mutate: handleDeleteProperty } = useMutation({
    mutationFn: () => deleteProperty.execute(propertySelected!.id),
    onSuccess: () => {
      toast.success('Propriedade removida com sucesso')
      closeDeletePropertyContainer()
    },
    onError: () => {
      toast.error('Não foi possível remover essa propriedade')
      closeDeletePropertyContainer()
    },
  })

  return (
    <AlertDialog.Root
      open={isOpenDeletePropertyContainer}
      onOpenChange={closeDeletePropertyContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{`Deseja remover a propriedade ${propertySelected!.name}`}</AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={() => handleDeleteProperty()}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
