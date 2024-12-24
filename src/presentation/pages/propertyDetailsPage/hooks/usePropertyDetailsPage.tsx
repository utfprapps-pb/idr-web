import { type ReactNode, useCallback, useMemo, useState } from 'react'

import { ForageTab } from '../tabs'

type Tab = {
  key: string
  name: string
  subTabs: {
    key: string
    name: string
    component: ReactNode
  }[]
}

export const usePropertyDetailsPage = () => {
  const tabs = useMemo<Tab[]>(
    () => [
      {
        key: 'soil-data',
        name: 'Dados da Terra',
        subTabs: [
          {
            key: 'forage',
            name: 'Forrageiras',
            component: <ForageTab />,
          },
        ],
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

  const subTab = useMemo(() => {
    return subTabs.find((subTab) => subTab.key === activeSubTab)
  }, [activeSubTab, subTabs])

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab)
  }, [])

  const handleSubTabChange = useCallback((subTab: string) => {
    setActiveSubTab(subTab)
  }, [])

  return {
    tabs,
    subTab,
    subTabs,
    activeTab,
    activeSubTab,
    handleTabChange,
    handleSubTabChange,
  }
}
