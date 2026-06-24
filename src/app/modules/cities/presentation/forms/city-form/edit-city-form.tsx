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

import { makeRemoteUpdateCityUseCase } from '../../../main/factories/use-cases'
import { useCityContext } from '../../hooks/city-context.hook'
import {
  cityFormSchema,
  type CityFormSchema,
} from '../../validations/city-form-schema'

import { CityFormInputs } from './city-form-inputs'
import { CITY_INITIAL_FORM_DATA } from './city-initial-form-data'

export function EditCityForm() {
  const updateCityUseCase = makeRemoteUpdateCityUseCase()

  const { isOpenEditCityForm, closeEditCityForm, citySelected } =
    useCityContext()

  const queryClient = useQueryClient()

  const form = useHookForm<CityFormSchema>({
    defaultValues: CITY_INITIAL_FORM_DATA,
    values: citySelected
      ? {
          name: citySelected.name,
          state: citySelected.state as CityFormSchema['state'],
          regionId: citySelected.regionId,
        }
      : CITY_INITIAL_FORM_DATA,
    resolver: zodResolver(cityFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateCity } = useMutation({
    mutationFn: updateCityUseCase.execute,
  })

  const handleUpdateCity = useCallback(
    async (data: CityFormSchema) => {
      try {
        await mutateHandleUpdateCity({
          id: citySelected!.id,
          name: data.name,
          regionId: data.regionId,
        })
        queryClient.invalidateQueries({ queryKey: ['cities'], exact: false })
        toast.success('Cidade foi editada com sucesso')
        form.reset(CITY_INITIAL_FORM_DATA)
        closeEditCityForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [closeEditCityForm, form, mutateHandleUpdateCity, citySelected, queryClient]
  )

  return (
    <Sheet.Root open={isOpenEditCityForm} onOpenChange={closeEditCityForm}>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Cidade ${citySelected?.name}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a cidade
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="edit-city-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleUpdateCity)}
            >
              <CityFormInputs disableState />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer className="pb-8">
          <Button
            form="edit-city-form"
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

EditCityForm.displayName = 'EditCityForm'
