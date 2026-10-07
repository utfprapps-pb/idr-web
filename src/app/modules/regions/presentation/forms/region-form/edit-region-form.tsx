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

import { makeRemoteUpdateRegionUseCase } from '../../../main/factories/use-cases'
import { useRegionContext } from '../../hooks/region-context.hook'
import {
  regionFormSchema,
  type RegionFormSchema,
} from '../../validations/region-form-schema'

import { REGION_INITIAL_FORM_DATA } from './region-initial-form-data'

export function EditRegionForm() {
  const updateRegionUseCase = makeRemoteUpdateRegionUseCase()

  const { isOpenEditRegionForm, closeEditRegionForm, regionSelected } =
    useRegionContext()

  const queryClient = useQueryClient()

  const form = useHookForm<RegionFormSchema>({
    defaultValues: REGION_INITIAL_FORM_DATA,
    values: regionSelected
      ? { name: regionSelected.name }
      : REGION_INITIAL_FORM_DATA,
    resolver: zodResolver(regionFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateRegion } = useMutation({
    mutationFn: updateRegionUseCase.execute,
  })

  const handleUpdateRegion = useCallback(
    async (data: RegionFormSchema) => {
      try {
        await mutateHandleUpdateRegion({
          id: regionSelected!.id,
          name: data.name,
        })
        queryClient.invalidateQueries({ queryKey: ['regions'], exact: false })
        toast.success('Região foi editada com sucesso')
        form.reset(REGION_INITIAL_FORM_DATA)
        closeEditRegionForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditRegionForm,
      form,
      mutateHandleUpdateRegion,
      regionSelected,
      queryClient,
    ]
  )

  return (
    <Sheet.Root open={isOpenEditRegionForm} onOpenChange={closeEditRegionForm}>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Região ${regionSelected?.name}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a região
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="edit-region-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleUpdateRegion)}
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

        <Sheet.Footer className="pb-8">
          <Button
            form="edit-region-form"
            type="submit"
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

EditRegionForm.displayName = 'EditRegionForm'
