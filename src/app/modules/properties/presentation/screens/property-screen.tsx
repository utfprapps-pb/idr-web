import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { useSearchParams } from 'react-router-dom'

import { AnimalsScreen } from '@/app/modules/animals/presentation/screens/animals-screen'
import { CultivationsScreen } from '@/app/modules/cultivations/presentation/screens/cultivations-screen'
import { ForageAvailabilityScreen } from '@/app/modules/forage-availability/presentation/screens/forage-availability-screen'
import { ForagesScreen } from '@/app/modules/forages/presentation/screens/forages-screen'
import { ImprovementsScreen } from '@/app/modules/improvements/presentation/screens/improvements-screen'
import { MachinesScreen } from '@/app/modules/machines/presentation/screens/machines-screen'
import { NutritionalBalancingsScreen } from '@/app/modules/nutritional-balancings/presentation/screens/nutritional-balancings-screen'
import { Breadcrumb, ScrollArea, Tabs } from '@/core/presentation/components/ui'

type Tab =
  | {
      key: string
      name: string
      subTabs: {
        key: string
        name: string
        component: ReactNode
      }[]
      component?: never
    }
  | {
      key: string
      name: string
      component: ReactNode
      subTabs?: never
    }

export function PropertyScreen() {
  const [searchParams] = useSearchParams()
  const property = searchParams.get('property') ?? ''
  const producer = searchParams.get('producer') ?? ''

  const tabs = useMemo<Tab[]>(
    () => [
      {
        key: 'soil-data',
        name: 'Dados da Terra',
        // todo: refactor this into its own screen component, similar to cultivations screen
        subTabs: [
          {
            key: 'forages',
            name: 'Forrageiras',
            component: <ForagesScreen />,
          },
          {
            key: 'forage-availability',
            name: 'Disponibilidade de Forragem',
            component: <ForageAvailabilityScreen />,
          },
          {
            key: 'improvements',
            name: 'Benfeitorias',
            component: <ImprovementsScreen />,
          },
          {
            key: 'machines',
            name: 'Máquinas',
            component: <MachinesScreen />,
          },
        ],
      },
      {
        key: 'animals-data',
        name: 'Animais',
        component: <AnimalsScreen />,
      },
      {
        key: 'cultivations-data',
        name: 'Cultivos',
        component: <CultivationsScreen />,
      },
      {
        key: 'nutritional-balancings-data',
        name: 'Balanceamentos Nutricionais',
        component: <NutritionalBalancingsScreen />,
      },
    ],
    []
  )

  const [activeTab, setActiveTab] = useState('soil-data')
  const [activeSubTab, setActiveSubTab] = useState('forages')

  const subTabs = useMemo(() => {
    const tab = tabs.find((tab) => tab.key === activeTab)

    return tab?.subTabs || []
  }, [activeTab, tabs])

  const tab = useMemo(() => {
    return tabs.find((tab) => tab.key === activeTab)
  }, [activeTab, tabs])

  const subTab = useMemo(() => {
    return subTabs.find((subTab) => subTab.key === activeSubTab)
  }, [activeSubTab, subTabs])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
  }, [])

  const handleSubTabChange = useCallback((subTab: string) => {
    setActiveSubTab(subTab)
  }, [])

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl text-slate-900 font-semibold">{property}</h1>
        <p className="text-base text-slate-600">
          Propriedade do produtor {producer}
        </p>
      </header>

      <Tabs.Root defaultValue={activeTab} onValueChange={handleTabChange}>
        <Tabs.List>
          {tabs.map((tab) => (
            <Tabs.Trigger key={tab.key} value={tab.key}>
              {tab.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        <Tabs.Content value={activeTab}>
          {tab?.component ? (
            tab.component
          ) : (
            <Tabs.Root value={activeSubTab} onValueChange={handleSubTabChange}>
              <div className="flex gap-4">
                <ScrollArea.Root className="h-[calc(100vh-300px)] w-48 flex-shrink-0">
                  <Tabs.List className="flex flex-col h-auto w-full space-y-1 p-0">
                    {subTabs.map((subTab) => (
                      <Tabs.Trigger
                        key={subTab.key}
                        value={subTab.key}
                        className="w-full justify-start text-left px-3 py-2 rounded-md"
                      >
                        {subTab.name}
                      </Tabs.Trigger>
                    ))}
                  </Tabs.List>
                  <ScrollArea.ScrollBar orientation="vertical" />
                </ScrollArea.Root>

                <div className="flex-1 min-w-0">
                  <Tabs.Content
                    className="mt-0 w-full space-y-8"
                    value={activeSubTab}
                  >
                    {subTab?.component && (
                      <>
                        <Breadcrumb.Root>
                          <Breadcrumb.List>
                            <Breadcrumb.Link
                              asChild
                              onClick={() => setActiveTab('soil-data')}
                            >
                              <span>Dados da Terra</span>
                            </Breadcrumb.Link>
                            <Breadcrumb.Separator />
                            <Breadcrumb.Item>
                              <Breadcrumb.Page>{subTab.name}</Breadcrumb.Page>
                            </Breadcrumb.Item>
                          </Breadcrumb.List>
                        </Breadcrumb.Root>

                        {subTab.component}
                      </>
                    )}
                  </Tabs.Content>
                </div>
              </div>
            </Tabs.Root>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </section>
  )
}

PropertyScreen.displayName = 'PropertyDetailsScreen'
