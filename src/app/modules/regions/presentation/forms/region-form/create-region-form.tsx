import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  Input,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteCreateRegionUseCase } from '../../../main/factories/use-cases'
import { useRegionContext } from '../../hooks/region-context.hook'
import {
  regionFormSchema,
  type RegionFormSchema,
} from '../../validations/region-form-schema'

import { REGION_INITIAL_FORM_DATA } from './region-initial-form-data'

export function CreateRegionForm() {
  const createRegionUseCase = makeRemoteCreateRegionUseCase()

  const { isOpenNewRegionForm, closeNewRegionForm } = useRegionContext()

  const queryClient = useQueryClient()

  const form = useHookForm<RegionFormSchema>({
    defaultValues: REGION_INITIAL_FORM_DATA,
    resolver: zodResolver(regionFormSchema),
  })

  const { mutateAsync: mutateHandleCreateRegion } = useMutation({
    mutationFn: createRegionUseCase.execute,
  })

  const handleCreateRegion = useCallback(
    async (data: RegionFormSchema) => {
      try {
        await mutateHandleCreateRegion(data)
        queryClient.invalidateQueries({ queryKey: ['regions'], exact: false })
        toast.success('Região foi cadastrada com sucesso')
        form.reset(REGION_INITIAL_FORM_DATA)
        closeNewRegionForm()
      } catch {
        toast.error('Erro ao cadastrar região')
      }
    },
    [closeNewRegionForm, form, mutateHandleCreateRegion, queryClient]
  )

  return (
    <Sheet.Root open={isOpenNewRegionForm} onOpenChange={closeNewRegionForm}>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Região</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova região
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-region-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleCreateRegion)}
            >
              <Form.Field
                name="name"
                control={form.control}
                render={({ field, fieldState }) => {
                  const { error } = fieldState

                  return (
                    <Form.Item>
                      <Form.Label>Nome*</Form.Label>
                      <Form.Control>
                        <Input
                          {...field}
                          placeholder="Nome da região"
                          isError={!!error?.message}
                        />
                      </Form.Control>
                      <Form.Message />
                    </Form.Item>
                  )
                }}
              />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-region-form"
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

CreateRegionForm.displayName = 'CreateRegionForm'
