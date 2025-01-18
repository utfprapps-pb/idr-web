import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { ForageDataFactory } from '@/main/factories/useCases/forage'
import { Button, Sheet, Form } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/hooks'

import { useForageContext } from '../../hooks/useForageContext'

import { PROPERTY_DEFAULT_VALUES } from './constants'
import { ForageFormInputs } from './forageFormInputs'
import { forageSchema, type ForageFormData } from './validation'

export const CreateForageForm: React.FC = () => {
  const { propertyId, isOpenNewForageForm, closeNewForageForm } =
    useForageContext()

  const createForage = ForageDataFactory.makeRemoteCreateForage()

  const queryClient = useQueryClient()

  const form = useHookForm<ForageFormData>({
    defaultValues: PROPERTY_DEFAULT_VALUES,
    resolver: zodResolver(forageSchema),
  })

  const { reset, handleSubmit: hookFormSubmit } = form

  const { mutateAsync: mutateHandleCreateForage } = useMutation({
    mutationFn: createForage.execute,
  })

  const handleCreateForage = useCallback(
    async (data: ForageFormData) => {
      try {
        await mutateHandleCreateForage({
          propertyId,
          forage: data,
        })
        queryClient.invalidateQueries({
          queryKey: ['forages'],
          exact: false,
        })
        toast.success('Forrageira foi cadastrada com sucesso')
        reset(PROPERTY_DEFAULT_VALUES)
        closeNewForageForm()
      } catch {
        toast.error('Erro ao cadastrar forrageira')
      }
    },
    [
      closeNewForageForm,
      mutateHandleCreateForage,
      propertyId,
      queryClient,
      reset,
    ]
  )

  return (
    <Sheet.Root open={isOpenNewForageForm} onOpenChange={closeNewForageForm}>
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Forrageira</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova forrageira
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <form
            id="create-forage-form"
            className="flex flex-col h-full gap-4"
            onSubmit={hookFormSubmit(handleCreateForage)}
          >
            <ForageFormInputs />
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-forage-form"
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
