import { useCallback, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  ScrollArea,
  Sheet,
  Tabs,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteCreatePropertyUseCase } from '../../../main/factories/use-cases'
import { usePropertyContext } from '../../hooks/property-context.hook'
import {
  propertyFormSchema,
  type PropertyFormSchema,
} from '../../validations/property-form-schema'

import { PROPERTY_INITIAL_FORM_DATA } from './property-initial-form-data'
import { PropertyFormCollaboratorsTab } from './tabs/property-form-collaborators-tab'
import { PropertyFormGeneralTab } from './tabs/property-form-general-tab'
import { PropertyFormLocalizationTab } from './tabs/property-form-localization-tab'
import { PropertyFormTotalAreaTab } from './tabs/property-form-total-area-tab'

export function CreatePropertyForm() {
  const createPropertyUseCase = makeRemoteCreatePropertyUseCase()

  const { isOpenNewPropertyForm, closeNewPropertyForm } = usePropertyContext()

  const queryClient = useQueryClient()

  const form = useHookForm<PropertyFormSchema>({
    defaultValues: PROPERTY_INITIAL_FORM_DATA,
    resolver: zodResolver(propertyFormSchema),
  })
  const [activeTab, setActiveTab] = useState('general')

  const tabs = useMemo(
    () => [
      {
        value: 'general',
        title: 'Dados Gerais',
        component: <PropertyFormGeneralTab />,
      },
      {
        value: 'collaborators',
        title: 'Colaboradores',
        component: <PropertyFormCollaboratorsTab />,
      },
      {
        value: 'totalArea',
        title: 'Área Total',
        component: <PropertyFormTotalAreaTab />,
      },
      {
        value: 'localization',
        title: 'Localização',
        component: <PropertyFormLocalizationTab />,
      },
    ],
    []
  )

  const { mutateAsync: mutateHandleCreateProperty } = useMutation({
    mutationFn: createPropertyUseCase.execute,
  })

  const handleCreateProperty = useCallback(
    async (data: PropertyFormSchema) => {
      try {
        await mutateHandleCreateProperty({ ...data })
        queryClient.invalidateQueries({
          queryKey: ['properties'],
        })
        toast.success('Propriedade foi cadastrada com sucesso')
        form.reset(PROPERTY_INITIAL_FORM_DATA)
        closeNewPropertyForm()
      } catch {
        toast.error('Erro ao cadastrar propriedade')
      }
    },
    [closeNewPropertyForm, form, mutateHandleCreateProperty, queryClient]
  )

  return (
    <Sheet.Root
      open={isOpenNewPropertyForm}
      onOpenChange={closeNewPropertyForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Propriedade</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova propriedade
          </Sheet.Description>
        </Sheet.Header>

        <Tabs.Root
          defaultValue="general"
          value={activeTab}
          className="h-[calc(100%-110px)]"
          onValueChange={setActiveTab}
        >
          <ScrollArea.Root>
            <Tabs.List>
              {tabs.map((tab) => (
                <Tabs.Trigger key={tab.value} value={tab.value}>
                  {tab.title}
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <ScrollArea.ScrollBar orientation="horizontal" />
          </ScrollArea.Root>

          <Form.Provider {...form}>
            <form
              id="create-property-form"
              className="h-[calc(100%-44px)]"
              onSubmit={form.handleSubmit(handleCreateProperty)}
            >
              <ScrollArea.Root className="h-full">
                <Tabs.Content
                  value={activeTab}
                  className="flex flex-col gap-4 px-2"
                >
                  {tabs.find((tab) => tab.value === activeTab)?.component}
                </Tabs.Content>
              </ScrollArea.Root>
            </form>
          </Form.Provider>
        </Tabs.Root>

        <Sheet.Footer>
          <Button
            form="create-property-form"
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

CreatePropertyForm.displayName = 'CreatePropertyForm'
