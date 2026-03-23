import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  Loading,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateGeneralCultivationPestUseCase } from '../../../main/factories/use-cases/general-cultivation-pests-use-cases'
import { useGeneralCultivationPestContext } from '../../hooks/general-cultivation-pest-context.hook'
import { useGeneralCultivationPestQuery } from '../../hooks/queries/general-cultivation-pest-query.hook'
import {
  generalCultivationPestFormSchema,
  type GeneralCultivationPestFormSchema,
} from '../../validations/general-cultivation-pest-form-schema'

import { GeneralCultivationPestFormInputs } from './general-cultivation-pest-form-inputs'
import { GENERAL_CULTIVATION_PEST_INITIAL_FORM_DATA } from './general-cultivation-pest-initial-form-data'

export function EditGeneralCultivationPestForm() {
  const {
    isOpenEditGeneralCultivationPestForm,
    closeEditGeneralCultivationPestForm,
    selectedGeneralCultivationPest,
  } = useGeneralCultivationPestContext()

  const { isLoading, generalCultivationPest } = useGeneralCultivationPestQuery({
    id: selectedGeneralCultivationPest!.id,
  })

  const updateGeneralCultivationPestUseCase =
    makeRemoteUpdateGeneralCultivationPestUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<GeneralCultivationPestFormSchema>({
    defaultValues: GENERAL_CULTIVATION_PEST_INITIAL_FORM_DATA,
    ...(generalCultivationPest && {
      values: {
        ...generalCultivationPest,
      },
    }),
    resolver: zodResolver(generalCultivationPestFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateGeneralCultivationPest } = useMutation(
    {
      mutationFn: updateGeneralCultivationPestUseCase.execute,
    }
  )

  const handleUpdateGeneralCultivationPest = useCallback(
    async (data: GeneralCultivationPestFormSchema) => {
      try {
        if (!selectedGeneralCultivationPest) {
          toast.error('Erro ao atualizar Praga de Cultivo Geral')
          return
        }

        await mutateHandleUpdateGeneralCultivationPest({
          generalCultivationPest: {
            name: data.name,
            id: selectedGeneralCultivationPest.id,
          },
        })

        queryClient.invalidateQueries({
          queryKey: ['general-cultivation-pests'],
          exact: false,
        })

        toast.success('Praga de Cultivo Geral foi editada com sucesso')
        form.reset(GENERAL_CULTIVATION_PEST_INITIAL_FORM_DATA)
        closeEditGeneralCultivationPestForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditGeneralCultivationPestForm,
      form,
      mutateHandleUpdateGeneralCultivationPest,
      queryClient,
      selectedGeneralCultivationPest,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditGeneralCultivationPestForm}
      onOpenChange={closeEditGeneralCultivationPestForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Praga de Cultivo Geral ${selectedGeneralCultivationPest?.name}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a Praga de Cultivo Geral.
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-general-cultivation-pest-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleUpdateGeneralCultivationPest)}
            >
              {isLoading ? (
                <div className="flex justify-center h-full items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <GeneralCultivationPestFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-general-cultivation-pest-form"
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

EditGeneralCultivationPestForm.displayName = 'EditGeneralCultivationPestForm'
