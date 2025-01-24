import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { ForageDataFactory } from '@/main/factories/useCases/forage'
import { moneyMask } from '@/masker'
import { Button, Form, Loading, Sheet } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/hooks'

import { useForage } from '../../hooks/useForage'
import { useForageContext } from '../../hooks/useForageContext'

import { PROPERTY_DEFAULT_VALUES } from './constants'
import { ForageFormInputs } from './forageFormInputs'
import { forageSchema, type ForageFormData } from './validation'

export const EditForageForm: React.FC = () => {
  const {
    propertyId,
    isOpenEditForageForm,
    closeEditForageForm,
    selectedForage,
  } = useForageContext()

  const { isLoading, forage } = useForage({
    id: selectedForage!.id,
    propertyId,
  })

  const updateForage = ForageDataFactory.makeRemoteUpdateForage()

  const queryClient = useQueryClient()

  const form = useHookForm<ForageFormData>({
    defaultValues: PROPERTY_DEFAULT_VALUES,
    ...(forage && {
      values: {
        ...forage,
        averageCost: moneyMask(forage.averageCost),
      },
    }),
    resolver: zodResolver(forageSchema),
  })

  const { reset, handleSubmit: hookFormSubmit } = form

  const { mutateAsync: mutateHandleUpdateForage } = useMutation({
    mutationFn: updateForage.execute,
  })

  const handleUpdateForage = useCallback(
    async (data: ForageFormData) => {
      try {
        if (!selectedForage) {
          toast.error('Erro ao atualizar forrageira')
          return
        }

        await mutateHandleUpdateForage({
          forage: {
            ...data,
            id: selectedForage.id,
          },
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['forages'],
          exact: false,
        })
        toast.success('Forrageira foi editada com sucesso')
        reset(PROPERTY_DEFAULT_VALUES)
        closeEditForageForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditForageForm,
      mutateHandleUpdateForage,
      propertyId,
      queryClient,
      reset,
      selectedForage,
    ]
  )

  return (
    <Sheet.Root open={isOpenEditForageForm} onOpenChange={closeEditForageForm}>
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Forrageira de ${selectedForage?.cultivation}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a forrageira
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <form
            id="update-forage-form"
            className="flex flex-col h-full gap-4"
            onSubmit={hookFormSubmit(handleUpdateForage)}
          >
            {isLoading ? (
              <div className="flex justify-center h-full items-center">
                <Loading size="lg" />
              </div>
            ) : (
              <ForageFormInputs />
            )}
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-forage-form"
            className="w-full"
            disabled={form.buttonDisabled}
          >
            Salvar
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}
