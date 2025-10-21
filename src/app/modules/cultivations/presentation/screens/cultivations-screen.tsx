import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { Breadcrumb, ScrollArea, Tabs } from '@/core/presentation/components/ui'

import { CultivationDiseasesScreen } from './cultivation-diseases-screen'
import { CultivationPestsScreen } from './cultivation-pests-screen'

type Tab = {
  key: string
  name: string
  component?: ReactNode
}

export function CultivationsScreen() {
  const tabs = useMemo<Tab[]>(
    () => [
      {
        key: 'cultivation-diseases',
        name: 'Doenças',
        component: <CultivationDiseasesScreen />,
      },
      {
        key: 'cultivation-pests',
        name: 'Pragas',
        component: <CultivationPestsScreen />,
      },
    ],
    []
  )

  const [activeTab, setActiveTab] = useState('cultivation-diseases')

  const tab = useMemo(() => {
    return tabs.find((tab) => tab.key === activeTab)
  }, [activeTab, tabs])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
  }, [])

  return (
    <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
      <div className="flex gap-4">
        <ScrollArea.Root className="h-[calc(100vh-200px)] w-48 flex-shrink-0">
          <Tabs.List className="flex flex-col h-auto w-full space-y-1 p-0">
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab.key}
                value={tab.key}
                className="w-full justify-start text-left px-3 py-2 rounded-md"
              >
                {tab.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          <ScrollArea.ScrollBar orientation="vertical" />
        </ScrollArea.Root>

        <div className="flex-1 min-w-0">
          <Tabs.Content value={activeTab} className="space-y-8 mt-0">
            {tab?.component && (
              <>
                <Breadcrumb.Root>
                  <Breadcrumb.List>
                    <Breadcrumb.Link>Dados dos cultivos</Breadcrumb.Link>
                    <Breadcrumb.Separator />
                    <Breadcrumb.Item>
                      <Breadcrumb.Page>{tab.name}</Breadcrumb.Page>
                    </Breadcrumb.Item>
                  </Breadcrumb.List>
                </Breadcrumb.Root>

                {tab.component}
              </>
            )}
          </Tabs.Content>
        </div>
      </div>
    </Tabs.Root>
  )
}

CultivationsScreen.displayName = 'CultivationsScreen'
