import { useCallback, useEffect, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  addPendingEntity,
  getPendingEntitiesByType,
  isCacheExpired,
  isCacheValid,
} from '@/core/lib/offline'
import { unmaskFloat } from '@/core/masker'
import { OfflineBanner } from '@/core/presentation/components/sync/offline-banner'
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

type CacheStatus = 'valid' | 'expired' | 'absent' | null

export function CreatePropertyForm() {
  const createPropertyUseCase = makeRemoteCreatePropertyUseCase()

  const { isOpenNewPropertyForm, closeNewPropertyForm } = usePropertyContext()

  const queryClient = useQueryClient()

  // Task 4.3: stable localId for this form instance
  const [localId] = useState(() => crypto.randomUUID())

  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [cacheStatus, setCacheStatus] = useState<CacheStatus>(null)

  useEffect(() => {
    const on = () => setIsOnline(true)
    const off = () => setIsOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  useEffect(() => {
    if (!isOnline) {
      Promise.all([isCacheValid(), isCacheExpired()]).then(
        ([valid, expired]) => {
          if (valid) setCacheStatus('valid')
          else if (expired) setCacheStatus('expired')
          else setCacheStatus('absent')
        }
      )
    } else {
      setCacheStatus('valid')
    }
  }, [isOnline])

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
      if (!isOnline) {
        try {
          const producerValue = data.general.producerId?.value
          const pendingProds = await getPendingEntitiesByType('PRODUCER')
          const pendingProducerLocalIds = new Set(
            pendingProds.map((p) => p.localId)
          )
          const producerLocalId =
            producerValue && pendingProducerLocalIds.has(producerValue)
              ? producerValue
              : undefined
          const producerId =
            producerValue && !producerLocalId ? producerValue : undefined

          await addPendingEntity({
            localId,
            type: 'PROPERTY',
            data: {
              name: data.general.name,
              cityId: data.general.cityId?.value,
              ...(producerLocalId ? { producerLocalId } : {}),
              ...(producerId ? { producerId } : {}),
              nakedAveragePrice: unmaskFloat(
                data.general.nakedAveragePricePerHectare
              ),
              leaseAveragePrice: unmaskFloat(
                data.general.leaseAveragePricePerHectare
              ),
              technicianIds: data.general.responsibleTechnicians.map(
                (t) => t.value
              ),
              collaborators: data.collaborators.map((c) => ({
                name: c.name,
                hoursPerDay: c.hoursPerDay,
              })),
              dairyCattleFarming: unmaskFloat(
                data.totalArea.dairyCattleFarming
              ),
              perennialPasture: unmaskFloat(data.totalArea.perennialPasture),
              summerPlowing: unmaskFloat(data.totalArea.summerPlowing),
              winterPlowing: unmaskFloat(data.totalArea.winterPlowing),
              latitude: unmaskFloat(data.localization.latitude),
              longitude: unmaskFloat(data.localization.longitude),
              attachments: data.localization.images
                .filter((image): image is { file: File } => !!image.file)
                .map((image) => image.file),
            },
            status: 'pending',
          })
          toast.success('Propriedade salva localmente')
          form.reset(PROPERTY_INITIAL_FORM_DATA)
          closeNewPropertyForm()
        } catch {
          toast.error('Erro ao salvar propriedade localmente')
        }
        return
      }

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
    [
      closeNewPropertyForm,
      form,
      isOnline,
      localId,
      mutateHandleCreateProperty,
      queryClient,
    ]
  )

  const isSubmitDisabled =
    form.buttonDisabled || (!isOnline && cacheStatus === 'absent')

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

        {/* Task 4.5: offline banner */}
        <OfflineBanner className="mx-1 mt-2" />

        {/* Task 7.2: cache expired warning (non-blocking amber) */}
        {!isOnline && cacheStatus === 'expired' && (
          <div className="mx-1 mt-2 flex items-center gap-2 rounded-md bg-amber-50 border border-amber-200 px-4 py-2 text-sm text-amber-700">
            Cache de dados vencido. Os dados de referência podem estar
            desatualizados.
          </div>
        )}

        {/* Task 7.1: cache absent — show blocking message */}
        {!isOnline && cacheStatus === 'absent' && (
          <p className="mx-1 mt-2 text-sm text-destructive">
            Sem dados de referência locais. Conecte-se à internet e sincronize
            antes de cadastrar offline.
          </p>
        )}

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
          {/* Task 4.5: dynamic button label */}
          <Button
            form="create-property-form"
            type="submit"
            className="w-full"
            disabled={isSubmitDisabled}
          >
            {isOnline ? 'Criar' : 'Salvar localmente'}
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}

CreatePropertyForm.displayName = 'CreatePropertyForm'
