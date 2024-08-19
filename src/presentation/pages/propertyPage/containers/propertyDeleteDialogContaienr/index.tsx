import React from 'react'

import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/presentation/components/ui'

import { PropertyDeleteContainerProps } from './types'

export const PropertyDeleteDialogContainer: React.FC<
	PropertyDeleteContainerProps
> = ({ open, onOpen, property, deleteProperty }) => {
	const { mutate: handleDeleteProperty } = useMutation({
		mutationFn: () => {
			if (!property?.id) {
				return Promise.reject(new Error('Not found Property'))
			}
			return deleteProperty.execute(property.id)
		},
		onSuccess: () => {
			toast.success('Propriedade removida com sucesso')
			onOpen(false)
		},
		onError: () => {
			toast.error('Não foi possível remover essa propriedade')
			onOpen(false)
		}
	})

	return (
		<AlertDialog.Root open={open} onOpenChange={onOpen}>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>{`Deseja remover a propriedade ${property?.name}`}</AlertDialog.Title>
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
