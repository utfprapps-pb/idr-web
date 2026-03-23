import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteCreateGeneralCultivationPestUseCase } from '../../../main/factories/use-cases/general-cultivation-pests-use-cases'
import { useGeneralCultivationPestContext } from '../../hooks/general-cultivation-pest-context.hook'
import {
  generalCultivationPestFormSchema,
  type GeneralCultivationPestFormSchema,
} from '../../validations/general-cultivation-pest-form-schema'

import { GeneralCultivationPestFormInputs } from './general-cultivation-pest-form-inputs'
import { GENERAL_CULTIVATION_PEST_INITIAL_FORM_DATA } from './general-cultivation-pest-initial-form-data'

export function CreateGeneralCultivationPestForm() {
  const {
    isOpenNewGeneralCultivationPestForm,
    closeNewGeneralCultivationPestForm,
  } = useGeneralCultivationPestContext()

  const createGeneralCultivationPestUseCase =
    makeRemoteCreateGeneralCultivationPestUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<GeneralCultivationPestFormSchema>({
    defaultValues: GENERAL_CULTIVATION_PEST_INITIAL_FORM_DATA,
    resolver: zodResolver(generalCultivationPestFormSchema),
  })

  const { mutateAsync: mutateHandleCreateGeneralCultivationPest } = useMutation(
    {
      mutationFn: createGeneralCultivationPestUseCase.execute,
    }
  )

  const handleCreateGeneralCultivationPest = useCallback(
    async (data: GeneralCultivationPestFormSchema) => {
      try {
        await mutateHandleCreateGeneralCultivationPest({
          generalCultivationPest: {
            ...data,
          },
        })

        queryClient.invalidateQueries({
          queryKey: ['general-cultivation-pests'],
          exact: false,
        })

        toast.success('Praga de Cultivo Geral foi cadastrada com sucesso')
        form.reset(GENERAL_CULTIVATION_PEST_INITIAL_FORM_DATA)
        closeNewGeneralCultivationPestForm()
      } catch {
        toast.error('Erro ao cadastrar praga de cultivo geral')
      }
    },
    [
      closeNewGeneralCultivationPestForm,
      form,
      mutateHandleCreateGeneralCultivationPest,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewGeneralCultivationPestForm}
      onOpenChange={closeNewGeneralCultivationPestForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Praga de Cultivo Geral</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova Praga de Cultivo Geral.
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-general-cultivation-pest-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleCreateGeneralCultivationPest)}
            >
              <GeneralCultivationPestFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-general-cultivation-pest-form"
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

CreateGeneralCultivationPestForm.displayName =
  'CreateGeneralCultivationPestForm'
