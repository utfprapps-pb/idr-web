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

import { makeRemoteCreateCityUseCase } from '../../../main/factories/use-cases'
import { useCityContext } from '../../hooks/city-context.hook'
import {
  cityFormSchema,
  type CityFormSchema,
} from '../../validations/city-form-schema'

import { CityFormInputs } from './city-form-inputs'
import { CITY_INITIAL_FORM_DATA } from './city-initial-form-data'

export function CreateCityForm() {
  const createCityUseCase = makeRemoteCreateCityUseCase()

  const { isOpenNewCityForm, closeNewCityForm } = useCityContext()

  const queryClient = useQueryClient()

  const form = useHookForm<CityFormSchema>({
    defaultValues: CITY_INITIAL_FORM_DATA,
    resolver: zodResolver(cityFormSchema),
  })

  const { mutateAsync: mutateHandleCreateCity } = useMutation({
    mutationFn: createCityUseCase.execute,
  })

  const handleCreateCity = useCallback(
    async (data: CityFormSchema) => {
      try {
        await mutateHandleCreateCity(data)
        queryClient.invalidateQueries({ queryKey: ['cities'], exact: false })
        toast.success('Cidade foi cadastrada com sucesso')
        form.reset(CITY_INITIAL_FORM_DATA)
        closeNewCityForm()
      } catch {
        toast.error('Erro ao cadastrar cidade')
      }
    },
    [closeNewCityForm, form, mutateHandleCreateCity, queryClient]
  )

  return (
    <Sheet.Root open={isOpenNewCityForm} onOpenChange={closeNewCityForm}>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Cidade</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova cidade
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-city-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleCreateCity)}
            >
              <CityFormInputs disableState />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-city-form"
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

CreateCityForm.displayName = 'CreateCityForm'
