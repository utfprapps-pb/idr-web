import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { PerennialForageDataFactory } from '@/main/factories/useCases/perennialForage'
import { Button, Sheet, Form } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/hooks'

import { usePerennialForageContext } from '../../hooks/usePerennialForageContext'

import { PROPERTY_DEFAULT_VALUES } from './constants'
import { PerennialForageFormInputs } from './perennialForageFormInputs'
import { type PerennialForageSchema, perennialForageSchema } from './validation'

export const CreatePerennialForageForm: React.FC = () => {
  const {
    propertyId,
    isOpenNewPerennialForageForm,
    closeNewPerennialForageForm,
  } = usePerennialForageContext()

  const createPerennialForage = PerennialForageDataFactory.makeRemoteCreate()

  const queryClient = useQueryClient()

  const form = useHookForm<PerennialForageSchema>({
    defaultValues: PROPERTY_DEFAULT_VALUES,
    resolver: zodResolver(perennialForageSchema),
  })

  const { reset, handleSubmit: hookFormSubmit } = form

  const { mutateAsync: mutateHandleCreatePerennialForage } = useMutation({
    mutationFn: createPerennialForage.execute,
  })

  const handleCreatePerennialForage = useCallback(
    async (data: PerennialForageSchema) => {
      try {
        await mutateHandleCreatePerennialForage({
          propertyId,
          perennialForage: data,
        })
        queryClient.invalidateQueries({
          queryKey: ['perennialForages'],
          exact: false,
        })
        toast.success('Forrageira Perene foi cadastrada com sucesso')
        reset(PROPERTY_DEFAULT_VALUES)
        closeNewPerennialForageForm()
      } catch {
        toast.error('Erro ao cadastrar forrageira perene')
      }
    },
    [
      closeNewPerennialForageForm,
      mutateHandleCreatePerennialForage,
      propertyId,
      queryClient,
      reset,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewPerennialForageForm}
      onOpenChange={closeNewPerennialForageForm}
    >
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Forrageira Perene</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova forrageira perene
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <form
            id="create-perennial-forage"
            className="flex flex-col h-full gap-4"
            onSubmit={hookFormSubmit(handleCreatePerennialForage)}
          >
            <PerennialForageFormInputs />
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-perennial-forage"
            type="submit"
            className="w-full"
            disabled={form.buttonDisabled}
          >
            Criar
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}
