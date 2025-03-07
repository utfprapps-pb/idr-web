import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { useSearchParams } from 'react-router-dom'

import { AnimalsScreen } from '@/app/modules/animals/presentation/screens/animals-screen'
import { ForagesScreen } from '@/app/modules/forages/presentation/screens/forages-screen'
import { ImprovementsScreen } from '@/app/modules/improvements/presentation/screens/improvements-screen'
import { MachinesScreen } from '@/app/modules/machines/presentation/screens/machines-screen'
import { Tabs } from '@/core/presentation/components/ui'

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
        subTabs: [
          {
            key: 'forage',
            name: 'Forrageiras',
            component: <ForagesScreen />,
          },
          {
            key: 'improvement',
            name: 'Benfeitorias',
            component: <ImprovementsScreen />,
          },
          {
            key: 'machine',
            name: 'Máquinas',
            component: <MachinesScreen />,
          },
        ],
      },
      {
        key: 'animal-data',
        name: 'Dados dos Animais',
        component: <AnimalsScreen />,
      },
    ],
    []
  )

  const [activeTab, setActiveTab] = useState('soil-data')
  const [activeSubTab, setActiveSubTab] = useState('forage')

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
            <Tabs.Root
              defaultValue={activeSubTab}
              onValueChange={handleSubTabChange}
            >
              <Tabs.List>
                {subTabs.map((subTab) => (
                  <Tabs.Trigger key={subTab.key} value={subTab.key}>
                    {subTab.name}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>

              <Tabs.Content className="mt-0 w-full" value={activeSubTab}>
                {subTab?.component}
              </Tabs.Content>
            </Tabs.Root>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </section>
  )
}

PropertyScreen.displayName = 'PropertyDetailsScreen'
