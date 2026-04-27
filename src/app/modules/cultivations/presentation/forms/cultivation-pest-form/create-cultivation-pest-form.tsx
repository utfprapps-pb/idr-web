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

import { makeRemoteCreateCultivationPestUseCase } from '../../../main/factories/use-cases/cultivation-pests-use-cases'
import { useCultivationPestContext } from '../../hooks/cultivation-pest-context.hook'
import {
  cultivationPestFormSchema,
  CultivationPestFormSchema,
} from '../../validations/cultivation-pest-form-schema'

import { CultivationPestFormInputs } from './cultivation-pest-form-inputs'
import { CULTIVATION_PEST_INITIAL_FORM_DATA } from './cultivation-pest-initial-form-data'

export function CreateCultivationPestForm() {
  const {
    propertyId,
    isOpenNewCultivationPestForm,
    closeNewCultivationPestForm,
  } = useCultivationPestContext()

  const createCultivationPestUseCase = makeRemoteCreateCultivationPestUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<CultivationPestFormSchema>({
    defaultValues: CULTIVATION_PEST_INITIAL_FORM_DATA,
    resolver: zodResolver(cultivationPestFormSchema),
  })

  const { mutateAsync: mutateHandleCreateCultivationPest } = useMutation({
    mutationFn: createCultivationPestUseCase.execute,
  })

  const handleCreateCultivationPest = useCallback(
    async (data: CultivationPestFormSchema) => {
      try {
        await mutateHandleCreateCultivationPest({
          propertyId,
          cultivationPest: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['cultivation-pests', propertyId],
          exact: false,
        })

        toast.success('Praga do cultivo foi cadastrada com sucesso')

        form.reset(CULTIVATION_PEST_INITIAL_FORM_DATA)

        closeNewCultivationPestForm()
      } catch {
        toast.error('Erro ao cadastrar praga do cultivo')
      }
    },
    [
      closeNewCultivationPestForm,
      form,
      mutateHandleCreateCultivationPest,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewCultivationPestForm}
      onOpenChange={closeNewCultivationPestForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Praga</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova praga do cultivo
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-cultivation-pest-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleCreateCultivationPest)}
            >
              <CultivationPestFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-cultivation-pest-form"
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

CreateCultivationPestForm.displayName = 'CreateCultivationPestForm'
