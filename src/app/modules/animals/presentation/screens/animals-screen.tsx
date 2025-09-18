import { useCallback, useMemo, useState, type ReactNode } from 'react'

import {
  Breadcrumb,
  Button,
  Input,
  ScrollArea,
  Tabs,
} from '@/core/presentation/components/ui'

import { AnimalDataTable } from '../components/animal-data-table'
import { AnimalDeleteDialog } from '../components/animal-delete-dialog'
import { AnimalContext, AnimalProvider } from '../contexts/animal-context'
import { AnimalForm } from '../forms/animal-form'

import { AnimalChildbirthsScreen } from './animal-childbirths-screen'
import { AnimalDeathsScreen } from './animal-deaths-screen'
import { AnimalDiseasesScreen } from './animal-diseases-screen'
import { AnimalHeiferCalfStagesScreen } from './animal-heifer-calf-stages-screen'
import { AnimalInseminationsScreen } from './animal-inseminations-screen'
import { AnimalPregnancyDiagnosesScreen } from './animal-pregnancy-diagnoses-screen'

type Tab = {
  key: string
  name: string
  component?: ReactNode
}

export function AnimalsScreen() {
  const [animalId, setAnimalId] = useState<number | null>(null)

  const tabs = useMemo<Tab[]>(
    () => [
      {
        key: 'animal-childbirths',
        name: 'Parto',
        component: animalId && <AnimalChildbirthsScreen animalId={animalId} />,
      },
      {
        key: 'animal-heifer-calf-stages',
        name: 'Fase Bezerra/Novilha',
        component: animalId && (
          <AnimalHeiferCalfStagesScreen animalId={animalId} />
        ),
      },
      {
        key: 'animal-diseases',
        name: 'Doenças',
        component: animalId && <AnimalDiseasesScreen animalId={animalId} />,
      },
      {
        key: 'animal-pregnancy-diagnoses',
        name: 'Diagnóstico de Gestação',
        component: animalId && (
          <AnimalPregnancyDiagnosesScreen animalId={animalId} />
        ),
      },
      {
        key: 'animal-deaths',
        name: 'Óbitos',
        component: animalId && <AnimalDeathsScreen animalId={animalId} />,
      },
      {
        key: 'animal-inseminations',
        name: 'Inseminações',
        component: animalId && (
          <AnimalInseminationsScreen animalId={animalId} />
        ),
      },
    ],
    [animalId]
  )

  const [activeTab, setActiveTab] = useState('animal-childbirths')

  const tab = useMemo(() => {
    return tabs.find((tab) => tab.key === activeTab)
  }, [activeTab, tabs])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
  }, [])

  const handleSelectAnimalId = useCallback((animalId: number | null) => {
    setAnimalId(animalId)
  }, [])

  return (
    <AnimalProvider>
      <AnimalContext.Consumer>
        {({
          selectedAnimal,
          isOpenDeleteAnimalContainer,
          isOpenNewAnimalForm,
          isOpenEditAnimalForm,
          filters,
          handleChangeFilters,
          openNewAnimalForm,
        }) => (
          <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
            {animalId && (
              <ScrollArea.Root className="w-full">
                <Tabs.List className="flex w-max">
                  {tabs.map((tab) => (
                    <Tabs.Trigger key={tab.key} value={tab.key}>
                      {tab.name}
                    </Tabs.Trigger>
                  ))}
                </Tabs.List>
                <ScrollArea.ScrollBar orientation="horizontal" />
              </ScrollArea.Root>
            )}

            <Tabs.Content value={activeTab} className="mt-4 space-y-8">
              {tab?.component && animalId ? (
                <>
                  <Breadcrumb.Root>
                    <Breadcrumb.List>
                      <Breadcrumb.Link
                        asChild
                        onClick={() => handleSelectAnimalId(null)}
                      >
                        <span>Dados dos animais</span>
                      </Breadcrumb.Link>
                      <Breadcrumb.Separator />
                      <Breadcrumb.Item>
                        <Breadcrumb.Page>{tab.name}</Breadcrumb.Page>
                      </Breadcrumb.Item>
                    </Breadcrumb.List>
                  </Breadcrumb.Root>

                  {tab.component}
                </>
              ) : (
                <section className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-2">
                    <Button
                      type="button"
                      variant="default"
                      className="self-end"
                      onClick={openNewAnimalForm}
                    >
                      Adicionar Animal
                    </Button>

                    <Input
                      className="w-fit"
                      value={filters.name?.value ?? ''}
                      onChange={({ target }) => {
                        handleChangeFilters({
                          name: {
                            value: target.value,
                            type: 'LIKE',
                          },
                        })
                      }}
                      placeholder="Procurar animal"
                    />
                  </div>

                  <AnimalDataTable onClickRow={handleSelectAnimalId} />
                  {selectedAnimal && isOpenDeleteAnimalContainer && (
                    <AnimalDeleteDialog />
                  )}

                  {(isOpenNewAnimalForm || isOpenEditAnimalForm) && (
                    <AnimalForm id={selectedAnimal?.id} />
                  )}
                </section>
              )}
            </Tabs.Content>
          </Tabs.Root>
        )}
      </AnimalContext.Consumer>
    </AnimalProvider>
  )
}

AnimalsScreen.displayName = 'AnimalsScreen'
