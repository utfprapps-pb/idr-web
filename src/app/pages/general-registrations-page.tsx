import { useCallback, useMemo, useState, type ReactNode } from 'react'

import { Breadcrumb, ScrollArea, Tabs } from '@/core/presentation/components/ui'

import { CitiesScreen } from '../modules/cities/presentation/screens/cities-screen'
import { GeneralCultivationDiseasesScreen } from '../modules/general-cultivations/presentation/screens/general-cultivation-diseases-screen'
import { GeneralCultivationPestsScreen } from '../modules/general-cultivations/presentation/screens/general-cultivation-pests-screen'
import { GeneralCultivationsScreen } from '../modules/general-cultivations/presentation/screens/general-cultivations-screen'
import { InputUseActiveIngredientsScreen } from '../modules/input-uses/presentation/screens/input-use-active-ingredients-screen'
import { InputUseLocationsScreen } from '../modules/input-uses/presentation/screens/input-use-locations-screen'
import { InputUseProductCategoriesScreen } from '../modules/input-uses/presentation/screens/input-use-product-categories-screen'
import { InputUseProductsScreen } from '../modules/input-uses/presentation/screens/input-use-products-screen'
import { RegionsScreen } from '../modules/regions/presentation/screens/regions-screen'

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

export function GeneralRegistrationsPage() {
  const tabs = useMemo<Tab[]>(
    () => [
      {
        key: 'general-registrations',
        name: 'Vegetais',
        subTabs: [
          {
            key: 'general-cultivations',
            name: 'Cultivos Gerais',
            component: <GeneralCultivationsScreen />,
          },
          {
            key: 'general-cultivation-pests',
            name: 'Pragas',
            component: <GeneralCultivationPestsScreen />,
          },
          {
            key: 'general-cultivation-diseases',
            name: 'Doenças',
            component: <GeneralCultivationDiseasesScreen />,
          },
        ],
      },
      {
        key: 'localization',
        name: 'Localização',
        subTabs: [
          {
            key: 'regions',
            name: 'Regiões',
            component: <RegionsScreen />,
          },
          {
            key: 'cities',
            name: 'Cidades',
            component: <CitiesScreen />,
          },
        ],
      },
      {
        key: 'input-uses',
        name: 'Utilização de Insumos',
        subTabs: [
          {
            key: 'input-use-locations',
            name: 'Locais de Utilização',
            component: <InputUseLocationsScreen />,
          },
          {
            key: 'input-use-product-categories',
            name: 'Categorias de Produtos',
            component: <InputUseProductCategoriesScreen />,
          },
          {
            key: 'input-use-products',
            name: 'Produtos',
            component: <InputUseProductsScreen />,
          },
          {
            key: 'input-use-active-ingredients',
            name: 'Princípios Ativos',
            component: <InputUseActiveIngredientsScreen />,
          },
        ],
      },
    ],
    []
  )

  const getFirstSubTabKey = useCallback(
    (tabKey: string) => {
      return tabs.find((tab) => tab.key === tabKey)?.subTabs?.[0]?.key ?? ''
    },
    [tabs]
  )

  const [activeTab, setActiveTab] = useState(() => tabs[0]?.key ?? '')
  const [activeSubTab, setActiveSubTab] = useState(() =>
    getFirstSubTabKey(tabs[0]?.key ?? '')
  )

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

  const handleTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab)
      setActiveSubTab(getFirstSubTabKey(tab))
    },
    [getFirstSubTabKey]
  )

  const handleSubTabChange = useCallback((subTab: string) => {
    setActiveSubTab(subTab)
  }, [])

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl text-slate-900 font-semibold">
          Cadastros Gerais
        </h1>
        <p className="text-base text-slate-600">
          Os cadastros também podem ser acessados pelos campos de utilização
        </p>
      </header>

      <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
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
                              onClick={() => handleTabChange(activeTab)}
                            >
                              <span>{tab?.name}</span>
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

GeneralRegistrationsPage.displayName = 'GeneralRegistrationsPage'
