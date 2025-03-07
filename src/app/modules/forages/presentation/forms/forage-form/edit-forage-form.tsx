import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { moneyMask } from '@/core/masker'
import { Button, Form, Loading, Sheet } from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateForageUseCase } from '../../../main/factories/use-cases'
import { useForageContext } from '../../hooks/forage-context.hook'
import { useForageQuery } from '../../hooks/queries/forage-query.hook'
import {
  forageFormSchema,
  type ForageFormSchema,
} from '../../validations/forage-form-schema'

import { ForageFormInputs } from './forage-form-inputs'
import { FORAGE_INITIAL_FORM_DATA } from './forage-initial-form-data'

export function EditForageForm() {
  const {
    propertyId,
    isOpenEditForageForm,
    closeEditForageForm,
    selectedForage,
  } = useForageContext()

  const { isLoading, forage } = useForageQuery({
    id: selectedForage!.id,
    propertyId,
  })

  const updateForageUseCase = makeRemoteUpdateForageUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<ForageFormSchema>({
    defaultValues: FORAGE_INITIAL_FORM_DATA,
    ...(forage && {
      values: {
        ...forage,
        averageCost: moneyMask(forage.averageCost),
      },
    }),
    resolver: zodResolver(forageFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateForage } = useMutation({
    mutationFn: updateForageUseCase.execute,
  })

  const handleUpdateForage = useCallback(
    async (data: ForageFormSchema) => {
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
        form.reset(FORAGE_INITIAL_FORM_DATA)
        closeEditForageForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditForageForm,
      form,
      mutateHandleUpdateForage,
      propertyId,
      queryClient,
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
            onSubmit={form.handleSubmit(handleUpdateForage)}
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

EditForageForm.displayName = 'EditForageForm'
