import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { PerennialForageDataFactory } from '@/main/factories/useCases/perennialForage'
import { moneyMask } from '@/masker'
import { Button, Form, Loading, Sheet } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/hooks'

import { usePerennialForage } from '../../hooks/usePerennialForage'
import { usePerennialForageContext } from '../../hooks/usePerennialForageContext'

import { PROPERTY_DEFAULT_VALUES } from './constants'
import { PerennialForageFormInputs } from './perennialForageFormInputs'
import { perennialForageSchema, PerennialForageSchema } from './validation'

export const EditPerennialForageForm: React.FC = () => {
  const {
    propertyId,
    isOpenEditPerennialForageForm,
    closeEditPerennialForageForm,
    selectedPerennialForage,
  } = usePerennialForageContext()

  const { isLoading, perennialForage } = usePerennialForage({
    id: selectedPerennialForage!.id,
    propertyId,
  })

  const updatePerennialForage = PerennialForageDataFactory.makeRemoteUpdate()

  const queryClient = useQueryClient()

  const form = useHookForm<PerennialForageSchema>({
    defaultValues: PROPERTY_DEFAULT_VALUES,
    ...(perennialForage && {
      values: {
        ...perennialForage,
        averageCost: moneyMask(perennialForage.averageCost),
      },
    }),
    resolver: zodResolver(perennialForageSchema),
  })

  const { reset, handleSubmit: hookFormSubmit } = form

  const { mutateAsync: mutateHandleUpdatePerennialForage } = useMutation({
    mutationFn: updatePerennialForage.execute,
  })

  const handleUpdatePerennialForage = useCallback(
    async (data: PerennialForageSchema) => {
      try {
        if (!selectedPerennialForage) {
          toast.error('Erro ao atualizar forrageira perene')
          return
        }

        await mutateHandleUpdatePerennialForage({
          perennialForage: {
            ...data,
            id: selectedPerennialForage.id,
          },
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['perennialForage'],
          exact: false,
        })
        toast.success('Forrageira Perene foi editada com sucesso')
        reset(PROPERTY_DEFAULT_VALUES)
        closeEditPerennialForageForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditPerennialForageForm,
      mutateHandleUpdatePerennialForage,
      propertyId,
      queryClient,
      reset,
      selectedPerennialForage,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditPerennialForageForm}
      onOpenChange={closeEditPerennialForageForm}
    >
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Forrageira Perene ${selectedPerennialForage?.cultivation}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a forrageira perene
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <form
            id="update-perennial-forage"
            className="flex flex-col h-full gap-4"
            onSubmit={hookFormSubmit(handleUpdatePerennialForage)}
          >
            {isLoading ? (
              <div className="flex justify-center h-full items-center">
                <Loading size="lg" />
              </div>
            ) : (
              <PerennialForageFormInputs />
            )}
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-perennial-forage"
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
