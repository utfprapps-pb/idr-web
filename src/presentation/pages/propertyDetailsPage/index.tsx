import { useSearchParams } from 'react-router-dom'

import { Tabs } from '@/presentation/components/ui'

import { usePropertyDetailsPage } from './hooks/usePropertyDetailsPage'

export const PropertyDetailsPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const property = searchParams.get('property') ?? ''
  const producer = searchParams.get('producer') ?? ''

  const {
    tab,
    tabs,
    subTab,
    subTabs,
    activeTab,
    activeSubTab,
    handleTabChange,
    handleSubTabChange,
  } = usePropertyDetailsPage()

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
