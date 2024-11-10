import { Home, Trees, Info, FileText, LucideIcon } from 'lucide-react'

import { PAGE_PATHS } from './paths'

type SidebarItems = {
  key: string
  name: string
  icon: LucideIcon
  path: string
}

export const sidebarItems = Object.freeze<SidebarItems[]>([
  {
    key: 'home',
    name: 'Início',
    icon: Home,
    path: PAGE_PATHS.home,
  },
  {
    key: 'properties',
    name: 'Propriedades',
    icon: Trees,
    path: PAGE_PATHS.properties,
  },
  {
    key: 'generalRegistrations',
    name: 'Cadastros Gerais',
    icon: Info,
    path: PAGE_PATHS.generalRegistrations,
  },
  {
    key: 'reports',
    name: 'Relatórios',
    icon: FileText,
    path: PAGE_PATHS.reports,
  },
])
