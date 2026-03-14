import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { onlyNumbersMask } from '@/core/masker'
import {
  Button,
  Form,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteCreateGeneralCultivationUseCase } from '../../../main/factories/use-cases/general-cultivations-use-cases'
import { useGeneralCultivationContext } from '../../hooks/general-cultivation-context.hook'
import {
  generalCultivationFormSchema,
  type GeneralCultivationFormSchema,
} from '../../validations/general-cultivation-form-schema'

import { GeneralCultivationFormInputs } from './general-cultivation-form-inputs'
import { GENERAL_CULTIVATION_INITIAL_FORM_DATA } from './general-cultivation-initial-form-data'

export function CreateGeneralCultivationForm() {
  const { isOpenNewGeneralCultivationForm, closeNewGeneralCultivationForm } =
    useGeneralCultivationContext()

  const createGeneralCultivationUseCase =
    makeRemoteCreateGeneralCultivationUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<GeneralCultivationFormSchema>({
    defaultValues: GENERAL_CULTIVATION_INITIAL_FORM_DATA,
    resolver: zodResolver(generalCultivationFormSchema),
  })

  const { mutateAsync: mutateHandleCreateGeneralCultivation } = useMutation({
    mutationFn: createGeneralCultivationUseCase.execute,
  })

  const handleCreateGeneralCultivation = useCallback(
    async (data: GeneralCultivationFormSchema) => {
      try {
        const parsePercent = (value: string) => {
          const parsed = Number(onlyNumbersMask(value))
          return Number.isNaN(parsed) ? 0 : parsed
        }

        await mutateHandleCreateGeneralCultivation({
          generalCultivation: {
            ...data,
            calcium: parsePercent(data.calcium),
            phosphorus: parsePercent(data.phosphorus),
            crudeProtein: parsePercent(data.crudeProtein),
            dryMatter: parsePercent(data.dryMatter),
            etherExtract: parsePercent(data.etherExtract),
            nonFibrousCarbohydrates: parsePercent(data.nonFibrousCarbohydrates),
            rumenDegradableProtein: parsePercent(data.rumenDegradableProtein),
            totalDigestibleNutrients: parsePercent(
              data.totalDigestibleNutrients
            ),
          },
        })

        queryClient.invalidateQueries({
          queryKey: ['general-cultivations'],
          exact: false,
        })

        toast.success('Cultivo geral foi cadastrada com sucesso')
        form.reset(GENERAL_CULTIVATION_INITIAL_FORM_DATA)
        closeNewGeneralCultivationForm()
      } catch {
        toast.error('Erro ao cadastrar cultivo geral')
      }
    },
    [
      closeNewGeneralCultivationForm,
      form,
      mutateHandleCreateGeneralCultivation,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewGeneralCultivationForm}
      onOpenChange={closeNewGeneralCultivationForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Novo Cultivo Geral</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar um novo Cultivo Geral.
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-general-cultivation-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleCreateGeneralCultivation)}
            >
              <GeneralCultivationFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-general-cultivation-form"
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

CreateGeneralCultivationForm.displayName = 'CreateGeneralCultivationForm'
