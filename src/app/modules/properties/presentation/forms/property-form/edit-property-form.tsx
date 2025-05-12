import { useCallback, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  Loading,
  ScrollArea,
  Sheet,
  Tabs,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdatePropertyUseCase } from '../../../main/factories/use-cases'
import { usePropertyContext } from '../../hooks/property-context.hook'
import { usePropertyQuery } from '../../hooks/queries/property-query.hook'
import {
  propertyFormSchema,
  type PropertyFormSchema,
} from '../../validations/property-form-schema'

import { PROPERTY_INITIAL_FORM_DATA } from './property-initial-form-data'
import { PropertyFormCollaboratorsTab } from './tabs/property-form-collaborators-tab'
import { PropertyFormGeneralTab } from './tabs/property-form-general-tab'
import { PropertyFormLocalizationTab } from './tabs/property-form-localization-tab'
import { PropertyFormTotalAreaTab } from './tabs/property-form-total-area-tab'

export function EditPropertyForm() {
  const updatePropertyUseCase = makeRemoteUpdatePropertyUseCase()

  const { isOpenEditPropertyForm, closeEditPropertyForm, propertySelected } =
    usePropertyContext()

  const { isLoading, property } = usePropertyQuery({
    id: propertySelected!.id,
  })

  const queryClient = useQueryClient()

  const form = useHookForm<PropertyFormSchema>({
    defaultValues: PROPERTY_INITIAL_FORM_DATA,
    values: property,
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

  const { mutateAsync: mutateHandleUpdateProperty } = useMutation({
    mutationFn: updatePropertyUseCase.execute,
  })

  const handleUpdateProperty = useCallback(
    async (data: PropertyFormSchema) => {
      try {
        await mutateHandleUpdateProperty({ ...data, id: propertySelected!.id })
        queryClient.invalidateQueries({
          queryKey: ['properties'],
        })
        toast.success('Propriedade foi editada com sucesso')
        form.reset(PROPERTY_INITIAL_FORM_DATA)
        closeEditPropertyForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditPropertyForm,
      form,
      mutateHandleUpdateProperty,
      propertySelected,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditPropertyForm}
      onOpenChange={closeEditPropertyForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Propriedade ${propertySelected?.name}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a propriedade
          </Sheet.Description>
        </Sheet.Header>

        {isLoading ? (
          <div className="flex justify-center h-full items-center">
            <Loading size="lg" />
          </div>
        ) : (
          <Tabs.Root
            defaultValue="general"
            value={activeTab}
            className="h-[calc(100%-110px)]"
            onValueChange={setActiveTab}
          >
            <ScrollArea.Root>
              <Tabs.List>
                {tabs.map((tab) => (
                  <Tabs.Trigger
                    key={tab.value}
                    value={tab.value}
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.title}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              <ScrollArea.ScrollBar orientation="horizontal" />
            </ScrollArea.Root>

            <Form.Provider {...form}>
              <form
                id="update-property-form"
                className="h-[calc(100%-44px)]"
                onSubmit={form.handleSubmit(handleUpdateProperty)}
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
        )}

        <Sheet.Footer className="pb-8">
          <Button
            form="update-property-form"
            type="submit"
            className="w-full"
            disabled={form.buttonDisabled || isLoading}
          >
            Salvar
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}

EditPropertyForm.displayName = 'EditPropertyForm'
