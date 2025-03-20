import { useCallback, useMemo, useState, type ReactNode } from 'react'

import {
  Breadcrumb,
  Button,
  Input,
  Tabs,
} from '@/core/presentation/components/ui'

import { AnimalDataTable } from '../components/animal-data-table'
import { AnimalDeleteDialog } from '../components/animal-delete-dialog'
import { AnimalContext, AnimalProvider } from '../contexts/animal-context'
import { AnimalForm } from '../forms/animal-form'

import { AnimalChildBirthsScreen } from './animal-childbirths-screen'

type Tab = {
  key: string
  name: string
  component?: ReactNode
}

export function AnimalsScreen() {
  const [animalId, setAnimalId] = useState<string | null>(null)

  const tabs = useMemo<Tab[]>(
    () => [
      {
        key: 'animal-childbirths',
        name: 'Parto',
        component: animalId && <AnimalChildBirthsScreen animalId={animalId} />,
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

  const handleSelectAnimalId = useCallback((animalId: string | null) => {
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
              <Tabs.List>
                {tabs.map((tab) => (
                  <Tabs.Trigger key={tab.key} value={tab.key}>
                    {tab.name}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
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
                      value={filters.name}
                      onChange={({ target }) => {
                        handleChangeFilters({ name: target.value })
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
